var path = require('path');
var loaderUtils = require('loader-utils');

var markdownCompilerPath = path.resolve(__dirname, 'markdown-compiler.js');

module.exports = function(source) {
  this.cacheable();

  this.options.__vueMarkdownOptions__ =
    this.query || this.vueMarkdown || this.options.vueMarkdown || {};

  var filePath = this.resourcePath;

  var result =
    'module.exports = require(' +
    loaderUtils.stringifyRequest(
      this,
      '!!vue-loader!' +
        markdownCompilerPath +
        '?raw!' +
        filePath +
        (this.resourceQuery || '')
    ) +
    ');';

  return result;
};
