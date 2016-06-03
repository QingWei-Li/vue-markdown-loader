var markdown = require('markdown-it')
var hljs = require('highlight.js')
var cheerio = require('cheerio')
var objectMerge = require('object-merge')
var loaderUtils = require('loader-utils')

var hjsConfig = function (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (__) {}
  }

  return '' // use external default escaping
}

module.exports = function (source) {
  this.cacheable()

  var parser
  var opts = this.options['markdown-it'] || {}

  if ({}.toString.call(opts.render) === '[object Function]') {
    parser = opts
  } else {
    opts = Object.assign({
      preset: 'default',
      html: true,
      highlight: hjsConfig
    }, opts)

    var plugins = opts.use
    var renderer = opts.renderer

    delete opts.use
    delete opts.renderer

    parser = markdown(opts.preset, opts)

    if (plugins) {
      plugins.forEach(function (plugin) {
        parser.use(plugin)
      })
    }

    if (renderer) {
      objectMerge(parser.renderer, renderer)
    }
  }

  var $ = cheerio.load(parser.render(source))

  $('script').remove()
  $('style').remove()

  var template = $.html().replace(/\n/g, '\\n')
  var filePath = this.resourcePath
  var loadContext = this

  return 'module.exports = require(' + loaderUtils.stringifyRequest(loadContext, '!!' + 'vue-loader!' + filePath) + ');'
    + 'if (module.exports.template !== `' + template + '`) module.exports.template = `' + template + '`;'
    + 'if (module.hot) {(function() {'
    + '  module.hot.accept();'
    + '  var hotAPI = require("vue-hot-reload-api");'
    + '  hotAPI.install(require("vue"), true);'
    + '  if (!hotAPI.compatible) return;'
    + '  var id = ' + loaderUtils.stringifyRequest(loadContext, filePath) + ';'
    + '  if (module.hot.data) {'
    + '    hotAPI.update(id, module.exports, `' + template + '`);'
    + '  } else {'
    + '    hotAPI.createRecord(id, module.exports);'
    + '  }'
    + '})()}'
}
