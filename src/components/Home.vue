<template>
  <div id="home" style="height:1000px">
    <el-row>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <!-- <img src="./assets/logo.png"> -->
          <h1>YuanJing</h1>
          <el-button v-on:click="count++">You clicked me {{ count }} times.</el-button>
          <br />即时消息对话
          <br />
          <!-- <input id="text" type="text" /> -->
          <el-input :span="2" id="text" type="text" placeholder="请输入内容" v-model="text" clearable></el-input>
          <el-button @click="send()">按'Enter'键发送消息</el-button>
          <el-button @click="closeWebSocket()">关闭会话</el-button>
          <div id="message"></div>
        </div>
      </el-col>

      <el-col :span="2" style="backgroud:red">
      &nbsp;
      </el-col>

      <!--右侧侧边栏-->
      <el-col :span="2" >
        <div class="grid-content bg-purple-light" style=" position: fixed;margin: auto;top:35%">
          <!--右侧侧边栏使用树形菜单-->
          <div class="manager"  @mouseenter="enter()" @mouseleave="leave()" :style="sidebarStyle">
            <el-radio-group style="margin-bottom: 20px;">
              <el-button type="none" @click="goLogin()" icon="el-icon-user-solid" :style="sidebarStyle">{{realname}}</el-button>
            </el-radio-group>
            <div>
              <el-button type="none" @click="goManager()" :style="sidebarStyle">Manager</el-button>
            </div>
            <div>
              <el-button type="none" @click="goRotateAlbum()" :style="sidebarStyle">Album</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";
import UserName from "./login/UserName";
import PassWord from "./login/PassWord";
export default {
  components: {
    "user-name": UserName,
    "pass-word": PassWord
  },
  data: function() {
    return {
      text:"",
      realname: "",
      username: "",
      password: "",
      count: 0,
      sidebarStyle: {
        width:'10%',
        // transform: translate(50px,100px);
        transform: "",
	      '-webkit-transition':''
      }
    };
  },
  methods: {
    send: function() {
      var message = document.getElementById("text").value;
      websocket.send(message);
    },
    closeWebSocket: function() {
      websocket.close();
    },
    goManager: function() {
      // window.location.href = "/auth/goLogin";
      this.$router.push("/manager");
      // this.$router.push({
      //   path:"/src/templates/login.html"
      // })
    },
    goRotateAlbum: function() {
      this.$router.push("/album");
    },
    goLogin() {
      this.$prompt("请输入用户名：", "登录", {
        confirmButtonText: "Next",
        dangerouslyUseHTMLString: true
      }).then(({ value }) => {
        this.username = value;
        this.$prompt("用户名：" + value + "<br>请输入密码：", "登录", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "confirm"
        }).then(({ value }) => {
          this.password = value;
          console.log(this.username + "|" + this.password);

          // this.$http({
          //   method:'POST',
          //   url:'http://10.21.26.91:5260/auth/signIn',
          //   data:{'userName':this.username,'passWord':this.password},
          // }). then((res) =>{
          //   alert("sss")
          // });
          let data = qs.stringify({
            passWord: this.password,
            userName: this.username
          });
          this.$axios
            .post("/api/auth/signIn", data)
            .then(resp => {
              console.log(resp.data);
              console.log(resp.data.username.realName);
              this.realname = resp.data.username.realName;
            })
            .catch(err => {
              console.log("请求失败：" + err.status + "," + err.statusText);
            });
        });
      });
    },
    enter: function() {
      this.$data.sidebarStyle.backgroundColor='black';
      this.$data.sidebarStyle.width='100%';
      this.$data.sidebarStyle.transition='width 1s';
    },
    leave: function() {
      this.$data.sidebarStyle.backgroundColor='';
      this.$data.sidebarStyle.width='10%';
      this.$data.sidebarStyle.transition='width 1s';
    }
  }
};

var websocket = null;

//判断当前浏览器是否支持WebSocket
if ("WebSocket" in window) {
  websocket = new WebSocket("ws://localhost:5260/websocket");
} else {
  alert("Not support websocket");
}

//连接发生错误的回调方法
websocket.onerror = function() {
  setMessageInnerHTML("error");
};

//连接成功建立的回调方法
websocket.onopen = function(event) {
  setMessageInnerHTML("Connected.");
};

//接收到消息的回调方法
websocket.onmessage = function(event) {
  setMessageInnerHTML(event.data);
};

//连接关闭的回调方法
websocket.onclose = function() {
  setMessageInnerHTML("Failed,Closed.");
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
}
</style>
