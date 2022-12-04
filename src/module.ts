import {addVitePlugin, defineNuxtModule} from '@nuxt/kit'
import { name, version } from '../package.json'
import viteSvgLoader from 'vite-svg-loader'
import vitePlugin from './vite-plugin'

export interface SvgModuleOptions {}

export default defineNuxtModule<SvgModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'svg'
  },
  setup (options, nuxt) {
    addVitePlugin(vitePlugin())
    addVitePlugin(viteSvgLoader())
  }
})
