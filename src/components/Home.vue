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
          <el-button @click="getUser();dialogVisible = true">打开私聊对话框</el-button>
          <div id="message"></div>
        </div>
      </el-col>

      <el-col :span="2" style="backgroud:red">&nbsp;</el-col>

      <!--右侧侧边栏-->
      <el-col :span="2">
        <div class="grid-content bg-purple-light" style=" position: fixed;margin: auto;top:35%">
          <!--右侧侧边栏使用树形菜单-->
          <div class="manager" @mouseenter="enter()" @mouseleave="leave()" :style="sidebarStyle">
            <div style="margin-buttom: 20px;">
              <button>Logout</button>
              <el-button
                type="none"
                @click="goLogin()"
                icon="el-icon-user-solid"
                :style="sidebarStyle"
              >{{realname}}</el-button>
            </div>
            <div>
              <el-button type="none" @click="goManager()" :style="sidebarStyle">Manager</el-button>
            </div>
            <div>
              <el-button type="none" @click="goRotateAlbum()" :style="sidebarStyle">Album</el-button>
            </div>
            <div>
              <el-button type="none" @click="goAnime()" :style="sidebarStyle">Anime</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--私聊对话框-->
    <el-dialog
      v-bind:title="wisperTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="8">
          <h3>联系人</h3>
          <el-button
            @click="swicthUser(user)"
            type="text"
            v-for="(user,index) in users"
            :key="index"
          >{{user}}</el-button>
        </el-col>
        <el-col :span="16">
          <el-div id="wisperContext"></el-div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-input id="wisperText" type="text" placeholder="请输入内容" clearable v-model="noMsg"></el-input>
        <el-button @click="sendMsg()">发送</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import UserName from "./login/UserName";
import PassWord from "./login/PassWord";

var toUserNo = "";
var wisperContext = "";
export default {
  components: {
    "user-name": UserName,
    "pass-word": PassWord
  },
  data: function() {
    return {
      wisperTitle: "",
      users: [],
      text: "",
      // context: "",
      noMsg: "",
      realname: "Login",
      lastWisper: "",
      nowWisper: "",
      username: "",
      password: "",
      count: 0,
      sidebarStyle: {
        backgroundColor: "purple",
        float: "right",
        width: "30%",
        // transform: translate(50px,100px);
        whiteSpace: "nowrap",
        overflow: "hidden",
        "-webkit-transition": ""
      },
      dialogVisible: false
    };
  },
  methods: {
    send: function() {
      // var message = document.getElementById("text").value;
      // websocket.send(message);
      var message = document.getElementById("text").value;
      var socketMsg = { msg: message, toUser: this.toUserNo,fromUser:this.username};
      if (toUserNo == "" || toUserNo == "undefined") {
        //群聊.
        socketMsg.type = 0;
      } else {
        //单聊.
        socketMsg.type = 1;
      }
      console.log(socketMsg);
      websocket.send(JSON.stringify(socketMsg));
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
    goAnime: function() {
      this.$router.push("/anime");
    },
    goLogin() {
      if (sessionStorage.getItem("username") == null) {
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
              .post("/auth/signIn", data)
              .then(resp => {
                console.log(resp.data);
                this.realname = resp.data.username.realName;
                sessionStorage.setItem("username", resp.data.username.realName);
              })
              .catch(err => {
                console.log("请求失败：" + err.status + "," + err.statusText);
              });
          });
        });
      } else {
        this.$confirm("确认登出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "已退出登录!"
            });
            sessionStorage.removeItem("username");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    },
    enter: function() {
      this.$data.sidebarStyle.backgroundColor = "purple";
      this.$data.sidebarStyle.width = "100%";
      this.$data.sidebarStyle.transition = "width 1s";
    },
    leave: function() {
      this.$data.sidebarStyle.backgroundColor = "";
      this.$data.sidebarStyle.width = "30%";
      this.$data.sidebarStyle.transition = "width 1s";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          toUserNo = "";
          wisperContext="";
          done();
        })
        .catch(_ => {});
    },
    sendMsg() {
      // this.context += this.realname+"："+this.noMsg + "<br>";
      var message = document.getElementById("wisperText").value;
      var socketMsg = { msg: message, toUser: toUserNo };
      if (toUserNo == "" || toUserNo == "undefined") {
        //群聊.
        socketMsg.type = 0;
      } else {
        //单聊.
        socketMsg.type = 1;
      }
      console.log(socketMsg);
      websocket.send(JSON.stringify(socketMsg));
    },
    getUser() {
      // toUserNo = "1";
      this.$axios
        .post("/sys/user/query", null)
        .then(resp => {
          this.users = resp.data.data;
          // this.lastWisper=resp.data.data[0].userName;
        })
        .catch(err => {
          console.log("请求失败：" + err.status + "," + err.statusText);
        });
    },
    swicthUser(obj) {
      this.wisperTitle = "与" + obj + "聊天中";
      toUserNo = obj;
      //存储旧对话
      if (this.lastWisper != "" || this.lastWisper != "undefined") {
        localStorage.setItem(this.lastWisper, wisperContext);
      }
      wisperContext="";
      //获取新对话记录
      var oldContext = localStorage.getItem(obj);
      wisperContext = oldContext;
      this.lastWisper = obj;
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

var name = sessionStorage.getItem("username");
//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
  console.log(innerHTML)
  if (toUserNo == "" || toUserNo == "undefined") {
    document.getElementById("message").innerHTML += innerHTML + "<br/>";
  } else {
    document.getElementById("wisperContext").innerHTML += innerHTML + "<br/>";
  }
}

//关闭连接
function closeWebSocket() {
  websocket.close();
}

var name = sessionStorage.getItem("username");
// //发送消息
// function send() {
//   var message = document.getElementById("text").value;
//   websocket.send(name+"："+message);
// }

//发送消息
// function send() {
//   //获取输入的文本信息进行发送
//   var message = document.getElementById("text").value;
//   var toUser = document.getElementById("toUser").value;
//   var fromUser = sessionStorage.getItem(username);
//   var socketMsg = { msg: message, toUser: 0, fromUser: 0, type: 0 };
//   if (toUser == "") {
//     //群聊.
//     socketMsg.type = 0;
//   } else {
//     //单聊.
//     socketMsg.type = 1;
//   }
//   console.log(socketMsg);
//   websocket.send(JSON.stringify(socketMsg));
// }
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
