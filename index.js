var markdown = require('markdown-it')
var hljs = require('highlight.js')
var cheerio = require('cheerio')
var hash = require('hash-sum')
var loaderUtils = require('loader-utils')
var cache = require('./cache')

var hjsConfig = function (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (__) {}
  }

  return ''
}

module.exports = function (source) {
  this.cacheable()

  var parser
  var opts = this.options.vueMarkdown || {}

  if ({}.toString.call(opts.render) === '[object Function]') {
    parser = opts
  } else {
    opts = Object.assign({
      preset: 'default',
      html: true,
      highlight: hjsConfig
    }, opts)

    var plugins = opts.use
    var preprocess = opts.preprocess

    delete opts.preprocess
    delete opts.use

    parser = markdown(opts.preset, opts)

    if (plugins) {
      plugins.forEach(function (plugin) {
        if (Array.isArray(plugin)) {
          parser.use.apply(parser, plugin)
        } else {
          parser.use(plugin)
        }
      })
    }
  }

  if (preprocess) {
    source = preprocess.call(this, parser, source)
  }
  source = source.replace(/@/g, '__at__')

  var filePath = this.resourcePath
  var content = parser.render(source).replace(/__at__/g, '@')
  var $ = cheerio.load(content, {
    decodeEntities: false
  })
  var output = { style: $.html('style'), script: $.html('script') }
  var result

  $('style').remove()
  $('script').remove()

  result = '<template><section>' + $.html() + '</section></template>' + '\n'
    + output.style + '\n'
    + output.script
  filePath = cache.save(hash(filePath), result)

  return 'module.exports = require('
    + loaderUtils.stringifyRequest(this, '!!' + 'vue-loader!' + filePath)
    + ');'
}
