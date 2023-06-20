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
                userProfileId: -1,
                userProfileVisible: false,
                socket: null,
                valueTitle: storage.get("valueTitle"),
                valueContent: storage.get("valueContent"),
                login: true,
                index: true,
                chatVisible: false,
                messageVisible: false,
                musicVisible: false,
                sliderVisible: true,
                chatPoint: 0,
                messagePoint: 0,
                token: storage.getToken(),
                user: storage.get(encode("lb_user")),
                users: [],
                follows: null,
                fans: null,
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
                const prefix = 'info:';
                let user = context.state.users.find(u => u.userId === userId);
                if (user) return user;
                if (!context.state.lock.find(u => u === prefix + userId)) {
                    context.commit('addLock', 'info' + userId); // 添加到 lock 列表中
                    user = context.state.users.find(u => u.userId === userId);
                    if (user) return user;
                    try {
                        const res = await axios.get(`/user/${userId}`);
                        if (res.data.code === 200) {
                            user = res.data.data;
                            context.commit('addUser', user); // 添加到 users 列表中
                            context.commit('removeLock', prefix + userId); // 从 lock 列表中移除
                            return user;
                        } else {
                            this.$st('获取用户信息失败', 'error');
                            context.commit('removeLock', prefix + userId); // 从 lock 列表中移除
                            return null;
                        }
                    } catch (error) {
                        console.error(error);
                        context.commit('removeLock', prefix + userId); // 从 lock 列表中移除
                        return null;
                    }
                } else {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(context.dispatch('getUserById', userId));
                        }, 50);
                    });
                }
            },
            async getFans(context) {
                const prefix = 'fans:';
                const lock = prefix + context.state.user.userId;
                if (context.state.fans) return context.state.fans;
                if (!context.state.lock.find(u => u === lock)) {
                    context.commit('addLock', lock); // 添加到 lock 列表中
                    let fans;
                    try {
                        const res = await axios.get(`/user/fans`);
                        if (res.data.code === 200) {
                            fans = res.data.data;
                            context.commit('addFan', fans); // 添加到 users 列表中
                            context.commit('removeLock', lock); // 从 lock 列表中移除
                            return context.state.fans;
                        } else {
                            this.$st('获取用户信息失败', 'error');
                            context.commit('removeLock', lock); // 从 lock 列表中移除
                            return null;
                        }
                    } catch (error) {
                        console.error(error);
                        context.commit('removeLock', lock); // 从 lock 列表中移除
                        return null;
                    }
                } else {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(context.dispatch('getFans'));
                        }, 50);
                    });
                }
            },
            // 获取关注列表
            async getFollows(context) {
                const prefix = 'follow:';
                const lock = prefix + context.state.user.userId;
                if (context.state.follows) return context.state.follows;
                if (!context.state.lock.find(u => u === lock)) {
                    context.commit('addLock', lock); // 添加到 lock 列表中
                    let follows;
                    try {
                        const res = await axios.get(`/user/followed`);
                        if (res.data.code === 200) {
                            follows = res.data.data;
                            context.commit('addFollow', follows); // 添加到 users 列表中
                            context.commit('removeLock', lock); // 从 lock 列表中移除
                            return context.state.follows;
                        } else {
                            this.$st('获取用户信息失败', 'error');
                            context.commit('removeLock', lock); // 从 lock 列表中移除
                            return null;
                        }
                    } catch (error) {
                        console.error(error);
                        context.commit('removeLock', lock); // 从 lock 列表中移除
                        return null;
                    }
                } else {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(context.dispatch('getFollows'));
                        }, 50);
                    });
                }

            }
        }

    }
)

export default store
