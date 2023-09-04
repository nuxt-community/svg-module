import {addVitePlugin, defineNuxtModule, extendWebpackConfig} from '@nuxt/kit'
import { name, version } from '../package.json'
import viteSvgLoader from 'vite-svg-loader'
import createVitePlugin from './create-vite-plugin'
import setupWebpack from "./setup-webpack";
import image from '@rollup/plugin-image'

export interface SvgModuleOptions {}

export default defineNuxtModule<SvgModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'svg'
  },
  setup (options, nuxt) {
    addVitePlugin(createVitePlugin())
    addVitePlugin(viteSvgLoader({
      defaultImport: 'url'
    }))
    addVitePlugin(
      {
        ...image({
            include: /\.svg\?data$/,
          }),
        // enforce: 'pre',
      }
    )

    extendWebpackConfig(setupWebpack)
  }
})
