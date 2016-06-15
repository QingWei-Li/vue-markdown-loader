var cooking = require('cooking')
var path = require('path')

cooking.set({
  entry: './src/entry.js',
  template: './src/index.tpl',
  devServer: {
    port: 8802
  },
  extends: ['vue'],
  publicPath: '/'
})

cooking.add('loader.md', {
  test: /\.md$/,
  loader: path.resolve(__dirname, '../index.js')
})

cooking.add('babel', {
  presets: ['es2015']
})

module.exports = cooking.resolve()
