import {addVitePlugin, defineNuxtModule} from '@nuxt/kit'
import { name, version } from '../package.json'
import viteSvgLoader from 'vite-svg-loader'

export interface SvgModuleOptions {}

export default defineNuxtModule<SvgModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'svg'
  },
  setup (options, nuxt) {
    addVitePlugin(viteSvgLoader())
  }
})
