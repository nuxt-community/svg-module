<template>
  <div>
    <h3>External Import:</h3>
    <img src="~assets/nuxt.svg">

    <h3>Inline base64:</h3>
    <img src="~assets/nuxt.svg?data">

    <h3>Inline Components:</h3>
    <NuxtLogo />
  </div>
</template>

<script>
import NuxtLogo from '~/assets/nuxt.svg?inline'

export default {
  components: {
    NuxtLogo
  }
}
</script>
