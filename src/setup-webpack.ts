import { Configuration,  RuleSetRule } from 'webpack';

/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in
 * case the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp|avif)$/i;
const ORIGINAL_TEST_OLD_NUXT = /\.(png|jpe?g|gif|svg|webp)$/i;
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp|avif)$/i;

/**
 * Perform the primary setup for the nuxt-svg module by removing and replacing
 * all of the rules that match ".svg" with the new one.
 */
export default function (config: Configuration) {
  // const fileLoaderOptions = Object.assign(
  //   {},
  //   getFileLoaderDefaultConfig(this),
  //   typeof options.fileLoader === "function"
  //     ? options.fileLoader(this)
  //     : options.fileLoader
  // );

  const rules = config.module?.rules;

  if (!rules) return

  // Remove any original svg rules.
  // @ts-ignore
  const svgRules = rules.filter((rule) => (rule as RuleSetRule).test && (rule as RuleSetRule).test?.test?.(".svg"));

  for (const rule of svgRules) {
    if (
    // @ts-ignore
      rule.test.source !== ORIGINAL_TEST.source &&
    // @ts-ignore
      rule.test.source !== ORIGINAL_TEST_OLD_NUXT.source &&
    // @ts-ignore
      rule.test.source !== REPLACEMENT_TEST.source
    ) {
      throw new Error(
        "nuxt-svg: Unexpected '.svg' rule in the webpack configuration"
      );
    }
    // @ts-ignore
    rule.test = REPLACEMENT_TEST;
  }

  const vueSvgLoader = [
    {
      loader: "vue-svg-loader",
      // options: options.vueSvgLoader || { svgo: false },
      options: { svgo: false },
    },
  ];

  if (config.name !== "server") {
    // @ts-ignore
    const jsxRule = config.module?.rules?.find((r) => r.test.test(".jsx"));
    // @ts-ignore
    const babelLoader = jsxRule?.use?.[jsxRule.use?.length - 1];
    if (babelLoader) vueSvgLoader.unshift(babelLoader);
  }

  /**
   * Create the custom rule that supports multiple resource queries. By default,
   * use file-loader (no resource query supplied).
   */
  const rule = {
    test: /\.svg$/i,
    oneOf: [
      {
        resourceQuery: /inline/,
        use: [
          'vue-loader',
          'vue-svg-loader',
        ],
      },
      {
        resourceQuery: /data/,
        use: {
          loader: "url-loader",
          options: { esModule: false },
        },
      },
      {
        resourceQuery: /raw/,
        use: {
          loader: "raw-loader",
          options: { esModule: false },
        },
      },
      {
        resourceQuery: /sprite/,
        use: {
          loader: "svg-sprite-loader",
          // options: options.svgSpriteLoader || {},
        },
      },
      {
        use: {
          loader: "file-loader",
          // options: { esModule: false, ...fileLoaderOptions },
          options: { esModule: false },
        },
      },
    ],
  };

  rules.push(rule); // Add the rule to the configuration.
}
