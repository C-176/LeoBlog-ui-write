<script setup>


import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import store from "@/store";
import {eventEnum, WebSocketChatData, WebSocketData} from "@/util/eventEnum";

const socket = ref(null);


onMounted(() => {
  store.commit('initSocket')
  // 创建 WebSocket 连接
  socket.value = store.state.socket
  buildWs(socket)

});

function buildWs(socket) {
  // 监听 WebSocket 连接打开事件
  socket.value.onopen = () => {
    console.log('websocket open')
    sendHeartbeat();
  };

  // import {HeartBeat,eventEnum} from "@/util/eventEnum";
  // 监听 WebSocket 接收到消息事件
  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data)

    switch (data.type) {
      case eventEnum.SINGLE_CHAT:
        store.commit('addToReceiveBuffer', JSON.parse(data.content))
        break;
      case eventEnum.HEART_BEAT_RESPONSE:
        refreshTimer();
        break;
      case eventEnum.AUTH_FAIL_RESPONSE:
        store.commit('initSocket')
        break;
      case eventEnum.NEW_ACTIVITY_NOTICE:
        store.commit('addToActivityBuffer', JSON.parse(data.content))
        break;
      case eventEnum.REFRESH_ACCESS_TOKEN:
        store.commit('setAccessToken', data.content)
        break;
      case eventEnum.SYSTEM_NOTICE :
        store.commit('addToSystemBuffer', data.content)
            break;
      case eventEnum.FREQUENCY_CONTROL_NOTICE:
        store.commit('addToSystemBuffer', data.content)
        break;
    }

  }
  socket.value.onclose = () => {
    // 重连
    console.log("websocket close, reconnect")
    reconnect();
  };
}

onBeforeUnmount(() => {
  if (socket.value) {
    // 关闭 WebSocket 连接
    socket.value.close();
  }
});

// 监听store.state.sendBufferList
watch(
    () => store.state.sendBufferList,
    (newVal) => {
      // 发送缓冲区中有数据时，将数据发送出去
      if (newVal.length > 0) {
        const data = newVal[0]
        var webSocketChatData = new WebSocketChatData();
        webSocketChatData.userId = data.userId;
        webSocketChatData.type = eventEnum.SINGLE_CHAT
        webSocketChatData.content = data
        socket.value.send(JSON.stringify(webSocketChatData));

        //发送成功后，从发送缓冲区中删除
        store.commit('deleteFromSendBuffer', data);
      }
    },
    {deep: true}
);

const heartBeatFrequency = 10000; // 心跳包发送频率，单位：毫秒
// 发送心跳包的函数
function sendHeartbeat() {
  // 发送心跳包数据
  const heartbeatData = new WebSocketChatData();
  heartbeatData.type = eventEnum.HEART_BEAT;
  heartbeatData.sendTime = new Date();
  heartbeatData.content = "ping"
  heartbeatData.userId = store.state.user.userId

  socket.value.send(JSON.stringify(heartbeatData));
}

// 设置定时器等待服务器回复
let timer = setTimeout(() => {
  // 10秒内未收到服务器回复，执行重新连接逻辑
  reconnect();
}, heartBeatFrequency);

function refreshTimer() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    sendHeartbeat();
  }, heartBeatFrequency);

}

const reconnectFrequency = 10000; // 重连频率，单位：毫秒
const maxReconnectTimes = 30 // 最大重连次数
let reconnectTimes = 0 // 当前重连次数

// 重新连接逻辑
function reconnect() {
  if(reconnectTimes > maxReconnectTimes){
    return
  }
  reconnectTimes++;
  // 关闭当前连接
  socket.value.close();
  // 执行重新连接操作
  store.commit('initSocket')
  socket.value = store.state.socket
  buildWs(socket)
}


</script>

<template>

</template>

<style scoped>

</style>