import { defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface SvgModuleOptions {}

export default defineNuxtModule<SvgModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'svg'
  },
  setup (options, nuxt) {
    console.log('setup')
  }
})
