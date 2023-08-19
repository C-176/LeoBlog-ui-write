import {decode, encode} from '@/util/AES'


const storage = {
    setAccessToken(value) {
        localStorage.setItem("accessToken", value);
    },
    getAccessToken() {
        return localStorage.getItem("accessToken");
    },
    setRefreshToken(value) {
        localStorage.setItem("refreshToken", value);
    },
    getRefreshToken() {
        return localStorage.getItem("refreshToken");
    },
    rmToken() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
    set(key, value, expire) {
        // console.log("set", key, value);
        if (expire) {
            // console.log("expire",expire)
            //过期时间20min
            const now = new Date().getTime();
            expire = now + expire * 60 * 1000;
            const obj = {
                data: value,
                expire: expire
            };
            localStorage.setItem(key, JSON.stringify(obj));

        } else {
            localStorage.setItem(key, value);
        }
    },
    get(key) {
        let value = localStorage.getItem(key)
        if (key === encode("lb_user")) {
            if (value) {
                value = JSON.parse(decode(value))
                return value
            }else{
                return null
            }

        } else if (key === "valueTitle" || key === "valueContent") {

            const time = new Date().getTime();

            let result = null;

            const obj = JSON.parse(value);
            if (obj) {
                if (time < obj.expire) {
                    result = obj.data;
                } else {
                    localStorage.removeItem(key);
                }
            }

            return '';
        }
        return value

    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    },
};

export default storage;
