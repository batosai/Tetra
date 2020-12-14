const { capitalize } = require('@tetrajs/core').utils

module.exports.parseParameters = (path, opts) => {
  let p = path
  const rest = {}
  if (typeof opts === 'object') {
    for (let i in opts) {
      if (p.search(`:${i}`) !== -1) {
        p = p.replace(`:${i}`, opts[i])
      } else {
        rest[i] = opts[i]
      }
    }

    if (Object.keys(rest).length !== 0) {
      p =
        `${p}?` +
        Object.entries(rest)
          .map(([key, val]) => `${key}=${val}`)
          .join('&')
    }
  } else if (typeof opts !== 'undefined') {
    p = p.replace(':id', opts)
  }
  return p
}

module.exports.defaultView = (path) => {
  if (path[0] === '/') {
    return path.substr(1)
  }
  return path
}

module.exports.generatePrefix = (name, path) => {
  if (name !== 'root') {
    return `${name}${capitalize(path)}`
  }
  return path
}
