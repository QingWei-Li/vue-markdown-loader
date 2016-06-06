# vue-markdown-loader

> Convert Markdown file to Vue Component using markdown-it.


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

## Restrict
You can not write more than one `template` or `script` tag in markdown file, because it will be processed vue-loader. This is a inelegant solution:

```markdown
# This will parse error

demo
```html
<script>
  module.exports = {}
</script>
`` `

<!-- Because tow script -->
<script>
  module.exports = {}
</script>
```

It will work. `<script?></script>`, it will not be parse by vue-loader, but I will deal with it.

```markdown
# This is ok

demo
```html
<script?>
  module.exports = {}
</script>

<template?>
  <div></div>
</template>
`` `

<script>
  module.exports = {}
</script>
```


## License
WTFPL

