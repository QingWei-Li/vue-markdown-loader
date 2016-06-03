# vue-markdown-loader

> Convert Markdown file to Vue Component using markdown-it.

## Installation

```bash
npm i vue-markdown-loader -D
```

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
  markdownIt: {
    preset: 'default',
    breaks: true,
    renderer: {
      rules: {
        table_open: function () {
          return '<table class="abc"></table>'
        }
      }
    }
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

  markdownIt: markdown
};
```

## License
WTFPL

