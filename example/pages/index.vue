<template>
  <div>
    <h3>External Import:</h3>
    <img src="~assets/nuxt.svg">

    <h3>Inline base64:</h3>
    <img src="~assets/nuxt.svg?data">

    <h3>Inline Components:</h3>
    <NuxtLogo />

    <h3>Inline Raw</h3>
    <div v-html="rawSvg" />
  </div>
</template>

<script>
import NuxtLogo from '~/assets/nuxt.svg?inline'
import nuxtLogoRaw from '~/assets/nuxt.svg?raw'

export default {
  components: {
    NuxtLogo
  },

  data () {
    return {
      rawSvg: nuxtLogoRaw
    }
  }
}
</script>
