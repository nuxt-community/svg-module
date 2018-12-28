/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in case
 * the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp)$/;
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp)$/;

export default function Module(options) {
  this.extendBuild(setup);
}

/**
 * Perform the primary setup for the nuxt-svg module by removing and replacing
 * all of the rules that match ".svg" with the new one.
 * @param config The webpack configuration object to extend
 */
function setup(config) {
  const rules = config.module.rules;

  // Remove any original svg rules
  const svgRules = rules.filter(rule => rule.test.test(".svg"));
  svgRules.forEach(rule => {
    if (
      rule.test.source !== ORIGINAL_TEST.source &&
      rule.test.source !== REPLACEMENT_TEST.source
    )
      throw "nuxt-svg: Unexpected '.svg' rule in the webpack configuration";
    rule.test = REPLACEMENT_TEST;
  });

  // Create the custom SVG rule
  const rule = {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /inline/,
        loader: "vue-svg-loader",
        options: { svgo: false }
      },
      { resourceQuery: /data/, loader: "url-loader" },
      { loader: "file-loader" } // By default, always use file-loader
    ]
  };

  rules.push(rule); // Actually add the rule
}

module.exports.meta = require("./package.json");
