import { Plugin } from 'vite'

// vite-svg-loader regex
const svgRegex = /\.svg(\?(raw|component|skipsvgo|inline))?$/

export default function () {
  return {
    name: 'nuxt-svg-vite-plugin',
    enforce: 'pre',
    async resolveId(id) {
      if (!id.match(svgRegex)) {
        return
      }

      // vite-svg-loader does not handle `inline` query
      // avoiding breaking change and replaces `inline` by `component`
      return this.resolve(id.replace('?inline', '?component'), undefined, { skipSelf: true })
    }
  } as Plugin
}
