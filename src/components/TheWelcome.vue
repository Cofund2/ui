<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
// import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
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

      The price for a reservation and gets calculated based on the pricing model. 
      There are various configurable pricing models for various use cases, e.g.
      <ul>
        <li>sharing recurring rent of an artelier space</li>
        <li>sharing initial costs of an expensive machine</li>
        <li>sharing maintainance costs of a mountain lodge</li>
      </ul>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon/>
    </template>
    <template #heading>Guest Book</template>
    Keep a log or guest book about the shared resource. 
  </WelcomeItem>


  <!--WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its
    sustainability. You can help us by
    <a target="_blank" href="https://vuejs.org/sponsor/">becoming a sponsor</a>.
  </WelcomeItem-->
</template>
