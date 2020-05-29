const fs = require('fs')
const path = require('path')
const os = require('os')

module.exports = name => {
  const packageJson = {
    name,
    version: '1.0.0',
    private: true,
    scripts: {
      start: 'tetra start',
      clear: "tetra cache:clear"
    },
  }
  fs.writeFileSync(
    path.join(name, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  )
}
