const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
}