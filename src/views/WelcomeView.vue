<script setup lang="ts">
import WelcomeItem from "@/components/WelcomeItem.vue";

import DocumentationIcon from "@/components/icons/IconDocumentation.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
import EcosystemIcon from "@/components/icons/IconEcosystem.vue";

import router from "@/router/index"

function cofund() {
  router.push("/create") 
}

</script>

<template>
  <heading>
    <img
      class="logo"
      src="@/assets/logo.svg"
    />
    <div class="title">
      <h1>Cofund</h1>
    </div>
  </heading>

  <items>
    <WelcomeItem>
      <template #icon>
        <EcosystemIcon/>
      </template>
      <template #heading>Share Resources</template>
      Cofund makes it easy for a community to share the costs of a shared resource in a fair manner.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Mange Bookings</template>
      Community members can create and manage reservations for that shared resource. 
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>Price Calculations</template>

        The price for a reservation is calculated according to the pricing model. 
        There are various configurable pricing models for various use cases, e.g.
        <ul>
          <li>sharing recurring rent of an artelier space</li>
          <li>sharing initial costs of an expensive machine</li>
          <li>sharing maintainance costs of a mountain lodge</li>
        </ul>
    </WelcomeItem>
  </items>

  <actions>
    <v-btn
        class="new-funding"
        variant="outlined"
        @click="cofund"
      >
      cofund a resource!
    </v-btn>
  </actions>
</template>

<style lang="less" scoped>
  @import "@/colors";

  heading {
    display: block;
    text-align: center;
    img {
      margin: 2rem; 
      width: 12rem; 
      height: 12rem; 
    }
  }
  
  actions {
    text-align: center;
    display: block;
  }
</style>