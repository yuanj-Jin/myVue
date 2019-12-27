<template>
  <div class="hello">
    <h1>YuanJing</h1>
    <button v-on:click="count++">You clicked me {{ count }} times.</button><br />
    Welcome
    <br />
    <input id="text" type="text" />
    <button @click="send()">Send</button>
    <button @click="closeWebSocket()">Close</button>
    <button id="login">Sign In</button>
    <div id="message"></div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      count: 0
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
