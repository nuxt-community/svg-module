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

    <h3>Inline URL:</h3>
    <div :style="inlineStyle" />
  </div>
</template>

<script>
import NuxtLogo from '~/assets/nuxt.svg?inline'
import NuxtLogoRaw from '~/assets/nuxt.svg?raw'

export default {
  components: {
    NuxtLogo
  },

  data () {
    return {
      rawSvg: NuxtLogoRaw,
      inlineStyle: {
        width: '556px',
        height: '96px',
        background: `url("${require('~/assets/nuxt.svg?url')}") no-repeat`,
        backgroundSize: 'cover'
      }
    }
  }
}
</script>
