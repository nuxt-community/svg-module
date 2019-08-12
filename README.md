# @nuxtjs/svg

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

_Super simple svg loading module for Nuxt.js_

[📖 **Release Notes**](./CHANGELOG.md)

## Introduction

SVG module for Nuxt.js, allows you to import `.svg` files in multiple ways depending on the [resource query](https://webpack.js.org/configuration/module/#rule-resourcequery) you provide. Currently, this allows you to do the following:

- `file.svg` - normal import using `file-loader`
- `file.svg?data` - base64 data url import using `url-loader`
- `file.svg?inline` - inline import using `vue-svg-loader`

## Installation

Using Yarn:
/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in
 * case the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp)$/;
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp)$/;

```console
yarn add @nuxtjs/svg
```

Using NPM:

```console
npm install @nuxtjs/svg
```

```javascript
// nuxt.config.js
export default {
  modules: [
    '@nuxtjs/svg'
  ]
};
```

And that's it! You don't have to install anything else, you're ready to go.

## Usage

The usage examples are documented as:

```html
<!-- Nuxt.js code -->
```

```html
<!-- Outputted html -->
```

### Standard external import

_Import normally as an external resource using `file-loader`_

```html
<template>
  <img src="~assets/nuxt.svg" />
</template>
```

```html
<img src="/_nuxt/9405b9978eb50f73b53ac1326b93f211.svg" />
```

### Inline base64 url

_Inline as a URL (no external requests) using `url-loader`_

```html
<template>
  <img src="~assets/nuxt.svg?data" />
</template>
```

```html
<img src="data:image/svg+xml;base64,P...2h913j1g18h98hr" />
```

### Inline svg element

_Inline as an actual svg element using `vue-svg-loader`_

```html
<template>
  <NuxtLogo />
</template>

<script>
  import NuxtLogo from "~/assets/nuxt.svg?inline";

  export default {
    components: {
      NuxtLogo
    }
  };
</script>
```

```html
<svg xmlns="http://www.w3.org/2000/svg"><path></path></svg>
```

## Caveats

In order for this module to work correctly, the [default `.svg` Nuxt.js webpack rule](https://nuxtjs.org/guide/assets/#webpack) gets replaced with this handler.

The only difference between this and the handler is that there is no `limit` for when `file-loader` replaces `url-loader`.

So when using the `?data` query, it will _always_ use `url-loader` regardless of file size, and when not using either resource query, it will always use `file-loader`).

## Contributing

As this loader attempts to abstract webpack configuration from the process and make it easier to use multiple svg loaders, any contributions that add more svg loader methods to the configuration will be accepted wholeheartedly!

Also I'll be actively maintaining this project so if you'd rather just make a request for a loader or a feature; I'd be happy to take a look and see what I can do myself :)

## License

[MIT License](./LICENSE)

Copyright (c) Sam Holmes

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/svg/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/svg

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/svg.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/svg

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/svg-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/svg-module

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/svg-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/svg-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/svg.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/svg
