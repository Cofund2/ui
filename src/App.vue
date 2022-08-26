<script setup lang="ts">
import { useResStore } from "./stores/res"
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
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
  <template v-if="page == 'home'">
  <header>
    <img
      alt="Cofund logo"
      class="logo"
      src="./assets/logo.svg"
    />

    <div class="wrapper">
      <HelloWorld msg="Cofund" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  </template>
  <template v-else>

  </template>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  width: 13rem;
  margin: 0 auto 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
