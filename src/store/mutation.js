import storage from "@/util/storage";
import main from "@/main";
import {encode} from '@/util/AES'
import axios from "axios";
import router from "@/router";
import store from "@/store/index";


const mutations = {
    changeLogin(state, login) {
        state.login = login;
    },
    clear() {
        store.commit('setUser',null)
        store.commit('removeToken',null)
        router.push('/LR')
    },
    logout(state) {
        axios.interceptors.request.use(config => {
            const token = state.accessToken
            const refreshToken = state.refreshToken
            if (token) config.headers['Authorization'] = token
            if (token) config.headers['RefreshAuthorization'] = refreshToken
            return config
        })
        axios.get("/user/logout");
        setTimeout(() => {
            store.commit('setUser',null)
            store.commit('removeToken',null)
        }, 500)
        router.push('/LR')
    },
    changeIndex(state, index) {
        state.index = index;
    },
    // 保存token
    setAccessToken(state, token) {
        state.accessToken = token;
        storage.setAccessToken(token);
    },
    setRefreshToken(state, value) {
        state.refreshToken = value;
        storage.setRefreshToken(value);
    },
    // 移除token
    removeToken(state) {
        state.accessToken = "";
        state.refreshToken = "";
        storage.rmToken();
    },
    // 设置用户并保存到storage
    setUser(state, user) {
        state.user = user;
        if (user == null) {
            // 清空localStorage
            storage.clear();
            return;
        }

        storage.set(encode("lb_user"), encode(JSON.stringify(user)));
    },

    getColor() {
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
    changeProject(state, project) {
        state.activeProject = project
    },
    changeBgCover(state, val) {
        state.bgCover = val
    },
    changeMessageVisible(state, messageVisible) {
        state.messageVisible = messageVisible;
        if (messageVisible) {
            state.messagePoint = 0;
        }
    }, changeMusicVisible(state, musicVisible) {
        state.musicVisible = musicVisible;
    },
    changeSliderVisible(state, sliderVisible) {
        state.sliderVisible = sliderVisible;
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
    changeUserProfileId(state, userProfileId) {
        state.userProfileId = userProfileId
    },
    changeUserProfileVisible(state, userProfileVisible) {
        state.userProfileVisible = userProfileVisible
    },
    changeValueTitle(state, valueTitle) {
        if (valueTitle == null || valueTitle == undefined) {
            return
        }
        state.valueTitle = valueTitle;
        storage.set("valueTitle", valueTitle, 20);

    },
    changeValueContent(state, valueContent) {
        if (valueContent == null || valueContent == undefined) {
            return
        }
        state.valueContent = valueContent;
        storage.set("valueContent", valueContent, 20);
    },
    initSocket(state) {
        const host = main.config.globalProperties.$host
        state.socket = new WebSocket("ws://" + host + "/api/net/" + state.user.userId + "/" + state.refreshToken);
    },
    changeMode(state) {
        state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    changeShell(state, shell) {
        state.shell = shell;
    },

    addUser(state, user) {  // 添加用户
        // q:如何保证唯一性？？？
        // a:在添加用户之前，先判断用户是否存在
        let u = state.users.find(u => u.userId === user.userId);
        if (u) return;
        state.users.push(user);
    },
    // 在 mutations 中添加以下代码
    addLock(state, userId) {
        state.lock.push(userId);
    },

    removeLock(state, userId) {
        state.lock = state.lock.filter(u => u !== userId);
    },
    addFan(state, fan) {
        if (state.fans == null) state.fans = []
        if (fan instanceof Array) {
            state.fans.push(...fan)
        } else {
            state.fans.push(fan);
        }

    },
    addFollow(state, follow) {
        if (state.follows == null) state.follows = []
        if (follow instanceof Array) {
            state.follows.push(...follow)
        } else {
            state.follows.push(follow);
        }

    },
    deleteFollow(state, follow) {
        state.follows = state.follows.filter(f => f != follow);
    },
    addToSendBuffer(state, message) {
        state.sendBufferList.push(message);
    },
    deleteFromSendBuffer(state, message) {
        state.sendBufferList = state.sendBufferList.filter(m => m != message);
    },
    addToReceiveBuffer(state, message) {
        state.receiveBufferList.push(message);
    },
    deleteFromReceiveBuffer(state, message) {
        state.receiveBufferList = state.receiveBufferList.filter(m => m != message);
    },
    addToActivityBuffer(state, message) {
        state.activityBufferList.push(message);
    },
    deleteFromActivityBuffer(state, message) {
        state.activityBufferList = state.activityBufferList.filter(m => m != message);
    },
    addToSystemBuffer(state, message) {
        state.systemBufferList.push(message);
    },
    deleteFromSystemBuffer(state, message) {
        state.systemBufferList = state.systemBufferList.filter(m => m != message);
    }


}

export default mutations

