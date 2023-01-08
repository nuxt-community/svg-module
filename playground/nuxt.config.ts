import { defineNuxtConfig } from 'nuxt/config'
import SvgModule from '..'

export default defineNuxtConfig({
  // builder: 'webpack',
  modules: [
    SvgModule
  ],
  svg: {}
})
