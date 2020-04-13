<template>
  <div class="root">
    <h2>file-loader</h2>
    <img src="~assets/nuxt.svg" />

    <h2>url-loader</h2>
    <img src="~assets/nuxt.svg?data" />

    <h2>vue-svg-loader</h2>
    <NuxtLogo />

    <h2>raw-loader</h2>
    <div v-html="rawNuxtLogo" />
  </div>
</template>

<script>
import NuxtLogo from "~/assets/nuxt.svg?inline";
import rawNuxtLogo from "~/assets/nuxt.svg?raw";

export default {
  components: { NuxtLogo },

  data() {
    return { rawNuxtLogo };
  },
};
</script>

<style scoped>
.root {
  font-family: sans-serif;
  max-width: 300px;
  margin: 0 auto;
}

h2:not(:first-of-type) {
  margin-top: 50px;
}
</style>
