const config = require('./default.config')

module.exports = new (class Generator {
  constructor() {
    this.entry = {}
  }

  addEntry(name, path) {
    this.entry[name] = path
  }

  getWebpackConfig() {
    return {
      ...config,
      entry: this.entry,
    }
  }
})()
