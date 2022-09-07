<script setup lang=ts>
  import router from "@/router/index"

  function goHome() {
    router.push("/") 
  }

</script>

<template>
  <div id="bglayer1"/>
  <div id="bglayer2"/>
  <div 
    :class="{ressource: $route.name == 'ressource'}"
    class=heading>
    <img
      class="logo"
      @click="goHome"
      src="@/assets/logo.svg"
    />
  </div>
  <router-view/>
</template>

<style scoped lang="less">
@import '@/colors.less';

.heading{
  display: block;
  text-align: center;
  img {
    margin: 1rem; 
    width: 12rem; 
    height: 12rem; 


    cursor: pointer; 
  }
  &.ressource{
    position: absolute; 
    z-index: 100;
    left: 0; 
    top: 0; 
    width: 5rem; 
    height: 5rem; 
    img {
      margin: 0.5rem; 
      width: 4rem; 
      height: 4rem; 
    }
  }
}



#bglayer1 {
  background: linear-gradient(#3279b2, shade(#e92181, 20%), #3279b2); 
  background-size: 400% 400%;
  animation: bggrad1 35s ease infinite;
  opacity: 0.5;
  width: 100vw; 
  height: 100vh; 
  position: fixed; 
  left:0; 
  top:0; 
}

#bglayer2 {
  background: linear-gradient(-45deg, @c0, @c1); 
  background-size: 400% 400%;
  animation: bggrad2 30s ease infinite;
  opacity: 0.5;
  width: 100vw; 
  height: 100vh; 
  position: fixed; 
  left:0; 
  top:0; 
}

@keyframes bggrad2 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes bggrad1 {
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
