import storage from "@/util/storage";
import main from "@/main";
import {encode} from '@/util/AES'


const mutations = {
    changeLogin(state, login) {
        state.login = login;
    },
    changeIndex(state, index) {
        state.index = index;
    },
    // 保存token
    setToken(state, token) {
        state.token = token;
        storage.setToken(token);
    },
    // 移除token
    removeToken(state) {
        state.token = "";
        storage.rmToken();
    },
    // 设置用户并保存到storage
    setUser(state, user) {
        state.user = user;
        storage.set(encode("lb_user"), encode(JSON.stringify(user)));
    },
    getColor(state) {
        // 生成随机柔和颜色
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 16).toString(16);
        }
        return color;
    },
    changeChatVisible(state, chatVisible) {

        state.chatVisible = chatVisible;
        if (chatVisible) {
            state.chatPoint = 0;
        }
    },
    changeMessageVisible(state, messageVisible) {
        state.messageVisible = messageVisible;
        if (messageVisible) {
            state.messagePoint = 0;
        }
    },
    changeChatPoint(state, chatPoint) {
        state.chatPoint = chatPoint

    },
    changeMessagePoint(state, messagePoint) {
        state.messagePoint = messagePoint
    },
    changeAddChat(state, addChat) {
        state.addChat = addChat
    },
    changeValueTitle(state, valueTitle) {
        if (valueTitle == null || valueTitle == undefined) {
            return
        }
        state.valueTitle = valueTitle;
        storage.set("valueTitle", valueTitle, 20);

    },
    changeValueContent(state, valueContent) {
        if (valueContent == null  || valueContent == undefined) {
            return
        }
        state.valueContent = valueContent;
        storage.set("valueContent", valueContent,20);
    },
    initSocket(state) {
        const host = main.config.globalProperties.$host
        state.socket = new WebSocket("ws://" + host + ":8080/net/" + state.user.userId);
    },
    changeMode(state) {
        state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    changeShell(state, shell) {
        state.shell = shell;
    },

    addUser(state, user) {  // 添加用户
        for (let i = 0; i < state.users.length; i++) {
            if (state.users[i].userId == user.userId) {
                return
            }
        }
        state.users.push(user);
    }


}

export default mutations

