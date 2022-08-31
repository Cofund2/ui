<script setup lang="ts">
import { useResStore } from "./stores/res"
import WelcomePage from "./components/WelcomePage.vue";
import { ref } from "vue"

let urlParams = new URLSearchParams(window.location.search);
let page = 'home'
let resourceId = (urlParams.get('resourceId')!)
if(resourceId) {
  useResStore().loadResource(resourceId)
  page = 'resource'
}
</script>

<template>
  <background-layer/>
  <WelcomePage v-if="page == 'home'"/>
</template>

<style scoped lang="less">
@import '@/colors.less';

background-layer {
	background: linear-gradient(#3279b2, #e92181); 
	background-size: 400% 400%;
	animation: gradient 35s ease infinite;
	opacity: 0.5;
	width: 100vh; 
  height: 100vw; 
  position: fixed; 
  left:0; 
  top:0; 
}

@keyframes gradient {
	0% {
		background-position: 50% 0%;
	}
	50% {
		background-position: 50% 100%;
	}
	100% {
		background-position: 50% 0%;
	}
}
</style>
