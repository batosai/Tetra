const { decamelize } = require('humps')
const defaultView = require('./utils').defaultView

const state = {
  name: null,
  method: null,
  route: null,
  action: null,
  defaultView: null,
}

module.exports.post = (route, { name, action }) =>
  Object.assign({}, state, {
    method: 'post',
    route: decamelize(route),
    name,
    action,
  })

module.exports.put = (route, { name, action }) =>
  Object.assign({}, state, {
    method: 'put',
    route: decamelize(route),
    name,
    action,
  })

module.exports.remove = (route, { name, action }) =>
  Object.assign({}, state, {
    method: 'delete',
    route: decamelize(route),
    name,
    action,
  })

module.exports.get = (route, { name, action }) =>
  Object.assign({}, state, {
    method: 'get',
    defaultView: defaultView(action),
    route: decamelize(route),
    name,
    action,
  })
