import { Plugin } from 'vite'

const svgRegex = /\.svg(\?(raw|component|skipsvgo|inline))?$/

export default function () {
  return {
    name: 'nuxt-svg-vite-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (!id.match(svgRegex)) {
        return
      }

      return id.replace('?inline', '?component')
    }
  } as Plugin
}
