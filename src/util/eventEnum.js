
// 创建websocket消息的事件类型枚举类
export const eventEnum = {
    /**
     * // 聊天相关
     *     // 单聊
     *     SINGLE_CHAT(101, "单聊消息"),
     *     // 群聊
     *     GROUP_CHAT(102, "群聊消息"),
     *     // 上线通知
     *     ONLINE_NOTICE(104, "上线通知"),
     *     // 下线通知
     *     OFFLINE_NOTICE(105, "下线通知"),
     *
     *
     *     // 系统通知
     *     SYSTEM_NOTICE(201, "系统通知"),
     *
     *     // 新增活动事件
     *     NEW_ACTIVITY_NOTICE(202, "新增活动事件"),
     *
     *     // websocket连接相关
     *     // 心跳
     *     HEART_BEAT(301, "心跳"),
     *     // 心跳响应
     *     HEART_BEAT_RESPONSE(302, "心跳响应"),
     *     // 连接请求
     *     CONNECT_REQUEST(303, "连接请求"),
     *     // 连接响应
     *     CONNECT_RESPONSE(304, "连接成功响应"),
     *
     *     // 认证失败响应
     *     AUTH_FAIL_RESPONSE(306, "认证失败响应"),
     *     // 认证成功响应
     *     AUTH_SUCCESS_RESPONSE(307, "认证成功响应"),
     */
    SINGLE_CHAT: 101,
    GROUP_CHAT: 102,
    AI_CHAT: 103,
    ONLINE_NOTICE: 104,
    OFFLINE_NOTICE: 105,
    SYSTEM_NOTICE: 201,
    NEW_ACTIVITY_NOTICE: 202,
    FREQUENCY_CONTROL_NOTICE: 203,
    HEART_BEAT: 301,
    HEART_BEAT_RESPONSE: 302,
    CONNECT_REQUEST: 303,
    CONNECT_RESPONSE: 304,
    AUTH_FAIL_RESPONSE: 306,
    AUTH_SUCCESS_RESPONSE: 307,
    FORCE_OFFLINE_NOTICE: 308,
    REFRESH_ACCESS_TOKEN: 309,

}



export class WebSocketData{
    constructor() {
        this.type = 0;
        this.content = "";
        this.sendTime = "";
    }
}
export class WebSocketChatData extends WebSocketData{
    constructor() {
        super();
        this.receiverId = -100;
        this.userId = -100;
    }
}
// return { HeartBeat, Message, eventEnum,WebSocketData,WebSocketChatData};