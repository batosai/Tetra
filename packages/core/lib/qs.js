module.exports = (...args) => {
  const ret = []

  for (let arg of args) {
    for (let data in arg) {
      ret.push(encodeURIComponent(data) + '=' + encodeURIComponent(arg[data]))
    }
  }

  return ret.join('&')
}
