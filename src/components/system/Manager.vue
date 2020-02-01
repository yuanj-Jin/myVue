<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- <el-aside width="200px" style=""> -->

    <div class="manager">
      <!-- <el-header style="text-align: right; font-size: 12px; background:purple">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>-->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        @select="handleSelect"
        router
      >
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">我的网站</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">系统监控</span>
          </template>
          <el-menu-item-group>
            <span slot="title">统计</span>
            <el-menu-item index="4">在线用户</el-menu-item>
            <el-menu-item index="4">定时任务</el-menu-item>
            <el-menu-item index="4">数据监控</el-menu-item>
            <el-menu-item index="4">服务监控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">系统工具</span>
          </template>
          <el-menu-item-group>
            <span slot="title">tool</span>
            <el-menu-item index="4">系统接口</el-menu-item>
            <el-menu-item index="4">报表打印</el-menu-item>
            <el-menu-item index="4">邮件发送</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">用户及权限</span>
            <el-menu-item index="/manager/4-1">
              用户
              <!-- <router-link v-bind:to="mainBody" tag="span">用户</router-link> -->
            </el-menu-item>
            <el-menu-item index="/manager/4-2">
              角色
              <!-- <router-link v-bind:to="mainBody" tag="span">角色</router-link> -->
            </el-menu-item>
            <el-menu-item index="3">
              权限
              <!-- <router-link v-bind:to="mainBody" tag="span">权限</router-link> -->
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">系统字典</span>
            <el-menu-item index="4">你猜...</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- <router-view /> -->
    </div>
    <!-- <el-container> -->
    <!-- <el-container v-html="mainBody"> -->
    <!-- <table-user></table-user> -->
    <!-- </el-container> -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import User from "./User";
import Role from "./Role";

export default {
  mode: "history",
  components: {
    "table-user": User,
    "table-role": Role
  },
  data() {
    return {
      isCollapse: true,
      search: "",
      mainBody: ""
      // mainBody: "<table-user></table-user>"
      // mainBody: "<button>sss</button>"
      // mainBody: "/4-1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keypath) {
      console.log(key, keypath);
      // console.log(key,keypath)
      // this.mainBody="<table-role></table-role>"
      // console.log(key);
      // this.mainBody = key;
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>