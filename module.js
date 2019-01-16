const _ = require("lodash");

/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in
 * case the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp)$/;
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp)$/;

/**
 * These are the default options that we want to use with the various loaders.
 * They are overwritten as needed.
 */
const defaults = {
  inline: { resourceQuery: /inline/, svgo: false },
  data: { resourceQuery: /data/ },
  file: {}
};

export default function Module(options) {
  options = _.merge(defaults, options);
  this.extendBuild(config => setup(config, options));
}

/**
 * Perform the primary setup for the nuxt-svg module by removing and replacing
 * all of the rules that match ".svg" with the new one.
 *
 * @param config The webpack configuration object to extend
 * @param options The Nuxt module options for this loader
 */
function setup(config, options) {
  // Retrieve and remove original SVG rules
  const rules = config.module.rules;
  const svgRules = rules.filter(rule => rule.test.test(".svg"));

  // Search for the rule to modify
  for (let rule of svgRules) {
    if (
      rule.test.source !== ORIGINAL_TEST.source &&
      rule.test.source !== REPLACEMENT_TEST.source
    ) {
      throw "nuxt-svg: Unexpected '.svg' rule in the webpack configuration";
    }

    // Modify the rule
    rule.test = REPLACEMENT_TEST;
  }

  // Create the custom SVG rule
  const rule = {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: getResourceQuery(options.inline),
        loader: "vue-svg-loader",
        options: options.inline
      },
      {
        resourceQuery: getResourceQuery(options.data),
        loader: "url-loader",
        options: options.data
      },
      {
        loader: "file-loader", // By default, always use file-loader
        options: options.file
      }
    ]
  };

  rules.push(rule); // Actually add the rule
}

/**
 * Retrieve and remove the resource query from the loader options
 * @param {object} options The loader options object
 */
function getResourceQuery(options) {
  if (!options.resourceQuery) return; // Ignore if no resource query

  const query = options.resourceQuery;
  delete options.resourceQuery;
  return query;
}

module.exports.meta = require("./package.json");
