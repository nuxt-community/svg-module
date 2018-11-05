export default function Module(options) {
	console.log(options);
	
	console.log(this.options);
	console.log(this.nuxt);
	console.log(this);
}

module.exports.meta = require("./package.json");
