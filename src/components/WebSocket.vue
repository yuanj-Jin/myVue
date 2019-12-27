<template>
  <div id="webSocket">
    Welcome
    <br />
    <input id="text" type="text" />
    <button @click="send()">Send</button>
    <button @click="closeWebSocket()">Close</button>
    <button id="login">Sign In</button>
    <div id="message"></div>

<div class="sharp">
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
</div>

  </div>
</template>

<script>
export default {
  name: "index"

};
/* <![CDATA[ */
var websocket = null;

//判断当前浏览器是否支持WebSocket
if ("WebSocket" in window) {
  websocket = new WebSocket("ws://10.21.26.91:8080/websocket");
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

/* ]]> */

$(document).keydown(function(event) {
  //判断当event.keyCode 为37时（即左方面键），执行函数to_left();
  //判断当event.keyCode 为39时（即右方面键），执行函数to_right();
  if (event.keyCode == 13) {
    send();
  }
});
// document.onkeydown = function(event) {
//         alert(event)
//     var e = event || window.event || arguments.callee.caller.arguments[0];
//
//     if (e && e.keyCode == 13) {
//
//     }
// };
$("#login").click(function() {
  window.location.href = "/auth/goLogin";
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
