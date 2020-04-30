<template>
  <el-main>
    <el-button type="none" @click="addUser()">Anime</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="序号" width="140"></el-table-column>
      <el-table-column prop="passWord" label="日期" width="140"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="realName" label="地址"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import qs from "qs";
export default {
  data() {
    const i = 0;
    const item = {
      id: 1,
      passWord: "123",
      userName: "wxh",
      realName: "王小虎"
    };
    return {
      tableData: Array(2).fill(item),
      isCollapse: true,
      search: ""
    };
  },
  methods: {
    addUser() {
      let data = qs.stringify({
        passWord: this.passWord,
        userName: this.userName,
        realName: this.realName
      }); 
      console.log(data)
      
      this.$axios
        .post("/api/sys/user/add", {
        passWord: this.passWord,
        userName: this.userName,
        realName: this.realName
      })
        .then(resp => {
          this.$message({
            message: resp.data.msg
          });
        })
        .catch(err => {
          console.log("请求失败：" + err.status + "," + err.statusText);
        });
    }
  }
};
</script>

<style>
</style>