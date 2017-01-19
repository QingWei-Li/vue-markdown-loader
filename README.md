# vue-markdown-loader

> Convert Markdown file to Vue Component using markdown-it.

**Supports both Vue 1.x and 2.0**

## Example
https://github.com/mint-ui/docs

## Demo

[Youku Video](http://v.youku.com/v_show/id_XMTU5NTU1OTEzNg==.html)

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
      require('markdown-it-xxx'),

      /* or */
      [require('markdown-it-xxx'), 'this is options']
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

webpack 2.x

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
        test: /\.md/,
        loader: 'vue-markdown-loader',
        options: markdown
      }
    ]
  }
};
```


## Note
Resource references can only use **absolute path**

e.g.

webpack config
```javascript
resolve: {
  alias: {
    src: __dirname + '/src'
  }
}
```

It'is work
```markdown
<img src="~src/images/abc.png">

<script>
  import Image from 'src/images/logo.png'
  import Hello from 'src/components/hello.vue'

  module.exports = {
  }
</script>
```

Incorrect

```markdown
<img src="../images/abc.png">

<script>
  import Image from '../images/logo.png'
  import Hello from './hello.vue'
  module.exports = {
  }
</script>
```


## License
WTFPL

