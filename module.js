/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in case
 * the core decides to add additional qualifiers to the pattern.
 * @type {RegExp}
 */
const REPLACEMENT_REGEX = /\.(png|jpe?g|gif|webp)$/;

export default function Module(options) {
	this.extendBuild(config => {
		const rules = config.module.rules;

		// Remove any original svg rules
		const svgRules = rules.filter(rule => rule.test.test(".svg"));
		svgRules.forEach(rule => rule.test = REPLACEMENT_REGEX);

		// Add the custom svg rule
		const rule = {
			test: /\.svg$/,
			oneOf: [
				{ resourceQuery: /inline/, loader: "vue-svg-loader", options: { svgo: false } },
				{ resourceQuery: /data/, loader: "url-loader" },
				{ loader: "file-loader" } // By default, always use file-loader
			]
		};

		rules.push(rule); // Actually add the rule
	});
}

module.exports.meta = require("./package.json");
