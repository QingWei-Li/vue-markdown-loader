You have other better choices

- https://github.com/egoist/vmark
- https://github.com/liril-net/ware-loader

---------

# vue-markdown-loader

[![npm](https://img.shields.io/npm/v/vue-markdown-loader.svg?style=flat-square)](https://www.npmjs.com/package/vue-markdown-loader)
![vue](https://img.shields.io/badge/vue-2.x-4fc08d.svg?colorA=2c3e50&style=flat-square)

> Convert Markdown file to Vue Component using markdown-it.

## Example

- https://github.com/mint-ui/docs
- https://github.com/elemefe/element

## Live demo

https://glitch.com/edit/#!/vue-markdown

## Installation

```bash
# For Vue1
npm i vue-markdown-loader@0 -D

# For Vue2
npm i vue-markdown-loader -D
npm i  vue-loader vue-template-compiler -D
```

## Feature

- Hot reload
- Write vue script
- Code highlight

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)

`webpack.config.js` file:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader'
      }
    ]
  }
};
```

### With `vue-loader 15`

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
```

### With Vue CLI 3

In your `vue.config.js` file:

```js
module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
}
```

## Options

### `preventExtract`

Since `v2.0.0`, this loader will automatically extract script and style tags from html token content (#26). If you do not need, you can set this option

```js
{
  test: /\.md$/,
  loader: 'vue-markdown-loader',
  options: {
    preventExtract: true
  }
}
```

### `wrapper`

You can customize wrapper tag no matter html element tag or vue component tag. Default is 'section'

```js
{
  test: /\.md$/,
  loader: 'vue-markdown-loader',
  options: {
    wrapper: 'article',
  }
}
```

### `markdownIt`

reference [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)

```javascript
{
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          // markdown-it config
          preset: 'default',
          breaks: true,
          preprocess: function(markdownIt, source) {
            // do any thing
            return source;
          },
          use: [
            /* markdown-it plugin */
            require('markdown-it-xxx'),
            /* or */
            [require('markdown-it-xxx'), 'this is options']
          ]
        }
      }
    ];
  }
}
```

Or you can customize `markdown-it`

```javascript
var markdown = require('markdown-it')({
  html: true,
  breaks: true
})

markdown
  .use(plugin1)
  .use(plugin2, opts, ...)
  .use(plugin3);

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: markdown
      }
    ]
  }
};
```

### Add Vue configuration

```js
var webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {}
    })
  ]
};
```

## License

WTFPL
