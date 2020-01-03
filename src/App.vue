<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- ksks   我想直接跳转到home，但给我跳转到login，怎么回事
    ？？？？  稍等下，上厕所。ok
    <button @click="goLogin()"></button> -->
    <router-view/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: '',
  components:{
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
