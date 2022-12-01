import {createStore} from 'vuex'
import storage from '@/util/storage'
import mutations from '../store/mutation'
import {encode} from '@/util/AES'
import axios from "axios";
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
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
            console.log(context.state.users.length)
            for (let i = 0; i < context.state.users.length; i++) {
                console.log(context.state.users[i].userId, userId)
                if (context.state.users[i].userId == userId) {
                    return context.state.users[i];
                }
            }
            console.log("getUserById", userId)
            axios.get('/user/' + userId).then(res => {
                if (res.data.code === 200) {
                    let user = JSON.stringify(res.data.data)
                    // 将userx存入store
                    for (let i = 0; i < context.state.users.length; i++) {
                        if (context.state.users[i].userId == JSON.parse(user).userId) {
                            return
                        }
                    }
                    // context.state.users.push(JSON.parse(user));
                    context.commit('addUser', JSON.parse(user))
                    return JSON.parse(user);
                } else {
                    console.log('添加用户失败：', res.data.data)
                    return context.state.user;
                }
            })
        },
    }
})

export default store
