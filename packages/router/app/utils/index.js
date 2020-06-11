module.exports.capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

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

    if (rest) {
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
