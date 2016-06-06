var markdown = require('markdown-it')
var hljs = require('highlight.js')
var cheerio = require('cheerio')
var loaderUtils = require('loader-utils')

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

  var $ = cheerio.load(parser.render(source), {
    decodeEntities: false
  })

  $('script').remove()
  $('style').remove()

  var template = $.html().replace(/<(script|template)(.*?)\?>/g, '<$1$2>')
  var filePath = this.resourcePath
  var loadContext = this

  return 'module.exports = require(' + loaderUtils.stringifyRequest(loadContext, '!!' + 'vue-loader!' + filePath) + ');'
    + 'module.exports.template = ' + JSON.stringify(template) + ';'
    + 'if (module.hot) {(function() {'
    + '  module.hot.accept();'
    + '  var hotAPI = require("vue-hot-reload-api");'
    + '  hotAPI.install(require("vue"), true);'
    + '  if (!hotAPI.compatible) return;'
    + '  var id = ' + loaderUtils.stringifyRequest(loadContext, filePath) + ';'
    + '  if (module.hot.data) {'
    + '    hotAPI.update(id, module.exports, ' + JSON.stringify(template) + ');'
    + '  } else {'
    + '    hotAPI.createRecord(id, module.exports);'
    + '  }'
    + '})()}'
}
