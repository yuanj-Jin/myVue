<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>YuanJing</h1>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
    <br />Welcome
    <br />
    <input id="text" type="text" />
    <button @click="send()">Send</button>
    <button @click="closeWebSocket()">Close</button>
    <button @click="goLogin()">Sign In</button>
    <div id="message"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    send: function() {
      var message = document.getElementById("text").value;
      websocket.send(message);
    },
    closeWebSocket:function(){
      websocket.close();
    },
    goLogin:function(){
      // window.location.href = "/auth/goLogin";
      this.$router.replace('/goLogin')
      // this.$router.push({
      //   path:"/src/templates/login.html"
      // })

    }
  }
};

var websocket = null;

//判断当前浏览器是否支持WebSocket
if ("WebSocket" in window) {
  websocket = new WebSocket("ws://10.21.26.91:5260/websocket");
} else {
  alert("Not support websocket");
}

//连接发生错误的回调方法
websocket.onerror = function() {
  setMessageInnerHTML("error");
};

//连接成功建立的回调方法
websocket.onopen = function(event) {
  setMessageInnerHTML("open");
};

//接收到消息的回调方法
websocket.onmessage = function(event) {
  setMessageInnerHTML(event.data);
};

//连接关闭的回调方法
websocket.onclose = function() {
  setMessageInnerHTML("close");
};

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
  websocket.close();
};

document.onkeydown = function(event) {
  if (event.keyCode == 13) {
    send();
  }
};

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
  document.getElementById("message").innerHTML += innerHTML + "<br/>";
}

//关闭连接
function closeWebSocket() {
  websocket.close();
}

//发送消息
function send() {
  var message = document.getElementById("text").value;
  websocket.send(message);
}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html,
body {
  height: 100%;
  margin: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
