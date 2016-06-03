# vue-markdown-loader

> Convert Markdown file to Vue Component using markdown-it.


## Demo

[Video]()

## Installation

```bash
npm i vue-markdown-loader -D
```

## Feature
- Hot reload
- Write vue script
- Code highlight


## Usage
[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

`webpack.config.js` file:

```javascript
module.exports = {
  module: {
    loaders: [{
      test: /\.md/,
      loader: 'vue-markdown-loader'
    }]
  }
};
```

## Options

reference [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
```javascript
{
  vueMarkdown: {
    // markdown-it config
    preset: 'default',
    breaks: true,

    preprocess: function(markdownIt, source) {
      // do any thing

      return source
    },

    use: [
      /* markdown-it plugin */
      require('markdown-it-xxx')
    ]
  }
}
```

Or you can customize markdown-it
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
    loaders: [{
      test: /\.md/,
      loader: 'vue-markdown-loader'
    }]
  },

  vueMarkdown: markdown
};
```

## License
WTFPL

