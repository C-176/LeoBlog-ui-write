import {decode, encode} from '@/util/AES'


const storage = {
    setToken(value) {
        localStorage.setItem("token", value);
    },
    getToken() {
        return localStorage.getItem("token");
    },
    rmToken() {
        localStorage.removeItem("token");
    },
    set(key, value, expire) {
        // console.log("set", key, value);
        if(expire){
            // console.log("expire",expire)
            //过期时间20min
            const now = new Date().getTime();
            const expires = now + expire * 60 * 1000;
            localStorage.setItem(key, JSON.stringify({data:value,expires:expires}));
        }else{
            localStorage.setItem(key, value);
        }
    },
    get(key) {
        let value = localStorage.getItem(key)
        if (key === encode("lb_user")) {
            if (value) {
                value = JSON.parse(decode(value))
            }
            return value
        } else if (key === "valueTitle" || key === "valueContent") {
            // console.log("get", key, JSON.parse(value).data);
            if (value) {
                return JSON.parse(value).data;
            }
        }
        return value

    },
    remove(key) {
        localStorage.removeItem(key);
    },
};

export default storage;
