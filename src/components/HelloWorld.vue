<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="title">
    <h1>{{ msg }}</h1>
    <h3>
      <button>
        Fund a Resource!
      </button>
    </h3>
  </div>
</template>

<style scoped lang="less">
@import "@/colors.less";

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.title h1,
.title h3 {
  text-align: center;
  color: @c0; 
}

.title button {
  display: block; 
  border: 0.2rem solid @c0; 
  margin: 0 auto;
  border-radius: 1rem; 
  padding: 1rem; 
  font-size: 1.5rem; 
  background-color: fade(@c0, 10%); 
  color: @c0;
  transition: background-color 0.5s ease;
  cursor: pointer;
  &:hover{
    background-color: fade(@c0, 50%);
  }
}

@media (min-width: 1024px) {
  .title h1,
  .title h3 {
    text-align: left;
  }
}
</style>
