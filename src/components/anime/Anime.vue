<template>
<div>
  <h2><a href="https://www.fghrsh.net/post/123.html" style="color: #38A3DB">Live2D 看板娘 v1.2</a> / Demo</h2>
    
    <div class="waifu">
        <div class="waifu-tips"></div>
        <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
        <div class="waifu-tool">
            <span class="fui-home"></span>
            <span class="fui-chat"></span>
            <span class="fui-eye"></span>
            <span class="fui-user"></span>
            <span class="fui-photo"></span>
            <span class="fui-info-circle"></span>
            <span class="fui-cross"></span>
        </div>
    </div>
</div>
</template>
<script>
import "../../assets/waifu.css";
import $ from 'jquery'
import {initModel} from '../../assets/waifu-tips.js';
import live2d from '../../assets/live2d.js';

export default {
  mounted(){
    initModel("../../assets/")
  }
};
</script>

<style>

</style>