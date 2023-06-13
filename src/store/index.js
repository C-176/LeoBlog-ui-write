import {createStore} from 'vuex'
import storage from '@/util/storage'
import mutations from '../store/mutation'
import {encode} from '@/util/AES'
import axios from "axios";
// 创建一个新的 store 实例
const store = createStore({
        state() {
            return {
                bgCover: false,
                shell: false,
                mode: 'light',
                addChat: -1,
                socket: null,
                valueTitle: storage.get("valueTitle"),
                valueContent: storage.get("valueContent"),
                login: true,
                index: true,
                chatVisible: false,
                messageVisible: false,
                chatPoint: 0,
                messagePoint: 0,
                token: storage.getToken(),
                user: storage.get(encode("lb_user")),
                users: [],
                lock: [],
                activeProject: 'info',
                color: [
                    'magenta',
                    'red',
                    'volcano',
                    'orange',
                    'gold',
                    'lime',
                    'green',
                    'cyan',
                    'blue',
                    'geekblue',
                    'purple'
                ],
            }
        },
        mutations: mutations,
        actions: {
            async getUserById(context, userId) {
                let user = context.state.users.find(u => u.userId === userId);
                if (user) return user;
                if (!context.state.lock.find(u => u === userId)) {
                    context.commit('addLock', userId); // 添加到 lock 列表中
                    user = context.state.users.find(u => u.userId === userId);
                    if (user) return user;
                    try {
                        const res = await axios.get(`/user/${userId}`);
                        if (res.data.code === 200) {
                            user = res.data.data;
                            context.commit('addUser', user); // 添加到 users 列表中
                            context.commit('removeLock', userId); // 从 lock 列表中移除
                            return user;
                        } else {
                            this.$st('获取用户信息失败', 'error');
                            context.commit('removeLock', userId); // 从 lock 列表中移除
                            return null;
                        }
                    } catch (error) {
                        console.error(error);
                        context.commit('removeLock', userId); // 从 lock 列表中移除
                        return null;
                    }
                } else {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(context.dispatch('getUserById', userId));
                        }, 50);
                    });
                }
            }
        }

    }
)

export default store
