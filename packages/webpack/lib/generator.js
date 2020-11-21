const webpackConfig = require('../config/default.config')

module.exports = class Generator {
  constructor() {
    this.entry = {}
    this.output = {}
  }

  addEntry(name, path) {
    this.entry[name] = path
    this.setOutPutName(name)
  }

  setOutPut(output) {
    this.output = { ...this.output, ...output }
  }

  setOutPutName(name) {
    this.output = { path: `${webpackConfig.output.path}/${name}` }
  }

  getWebpackConfig() {
    return {
      ...webpackConfig,
      entry: this.entry,
      output: { ...webpackConfig.output, ...this.output }
    }
  }
}
