<script setup lang="ts">

function cofund() {
  alert("test")
}

</script>

<template>
  hello
</template>

<style lang="less" scoped>
  @import "@/colors";

  heading {
    display: block;
    text-align: center;
    color: @c0; 
    img {
      margin: 2rem; 
      width: 12rem; 
      height: 12rem; 
    }
  }
  
  actions {
    text-align: center;
    display: block;
    .new-funding {
      color: @c0; 
    }
  }
</style>