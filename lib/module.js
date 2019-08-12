/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in
 * case the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp)$/
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp)$/

module.exports = function (options) {
  this.extendBuild(setup)
}

/**
 * Perform the primary setup for the nuxt-svg module by removing and replacing
 * all of the rules that match ".svg" with the new one.
 *
 * @param config The webpack configuration object to extend
 */
function setup (config) {
  const rules = config.module.rules

  // Remove any original svg rules
  const svgRules = rules.filter(rule => rule.test.test('.svg'))

  for (const rule of svgRules) {
    if (
      rule.test.source !== ORIGINAL_TEST.source &&
      rule.test.source !== REPLACEMENT_TEST.source
    ) {
      throw new Error("nuxt-svg: Unexpected '.svg' rule in the webpack configuration")
    }
    rule.test = REPLACEMENT_TEST
  }

  const vueSvgLoader = [
    {
      loader: 'vue-svg-loader',
      options: {
        svgo: false
      }
    }
  ]

  if (config.name === 'client') {
    const jsxRule = config.module.rules.find(r => r.test.test('.jsx'))
    const babelLoader = jsxRule.use[jsxRule.use.length - 1]
    vueSvgLoader.unshift(babelLoader)
  }

  // Create the custom SVG rule
  const rule = {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /inline/,
        use: vueSvgLoader
      },
      {
        resourceQuery: /data/,
        loader: 'url-loader'
      },
      {
        loader: 'file-loader' // By default, always use file-loader
      }
    ]
  }

  rules.push(rule) // Actually add the rule
}

module.exports.meta = require('../package.json')
