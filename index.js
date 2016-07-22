var cache = require('./cache')
var hash = require('hash-sum')
var cheerio = require('cheerio')
var hljs = require('highlight.js')
var markdown = require('markdown-it')
var loaderUtils = require('loader-utils')

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
var replaceDelimiters = function (str) {
  return str.replace(/({{|}})/g, '<span>$1</span>')
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
var renderHighlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) return ''

  try {
    return replaceDelimiters(hljs.highlight(lang, str, true).value)
  } catch (_) {}
}

/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
var renderVueTemplate = function (html) {
  var $ = cheerio.load(html, { decodeEntities: false })
  var output = { style: $.html('style'), script: $.html('script') }
  var result

  $('style').remove()
  $('script').remove()

  result = '<template><section>' + $.html() + '</section></template>\n'
    + output.style + '\n'
    + output.script

  return result
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
      highlight: renderHighlight
    }, opts)

    var plugins = opts.use
    var preprocess = opts.preprocess

    delete opts.use
    delete opts.preprocess

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

  var codeInlineRender = parser.renderer.rules.code_inline;
  parser.renderer.rules.code_inline = function(tokens, idx) {
    return replaceDelimiters(codeInlineRender(tokens, idx));
  }

  if (preprocess) {
    source = preprocess.call(this, parser, source)
  }
  source = source.replace(/@/g, '__at__')

  var filePath = this.resourcePath
  var content = parser.render(source).replace(/__at__/g, '@')
  var result = renderVueTemplate(content)

  filePath = cache.save(hash(filePath), result)

  return 'module.exports = require('
    + loaderUtils.stringifyRequest(this, '!!' + 'vue-loader!' + filePath)
    + ');'
}
