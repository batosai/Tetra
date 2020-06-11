const { decamelize } = require('humps')

const { get, post, put, remove } = require('./method')
const render = require('./render')

module.exports = (route, opt = {}, getCrud = []) => {
  const crud = ['index', 'show', 'new', 'create', 'edit', 'update', 'delete']
  let routes = []
  let actions = []

  if (opt.except) {
    if (!Array.isArray(opt.except)) opt.except = [opt.except]
    actions = crud.filter((i) => opt.except.indexOf(i) === -1)
  } else if (opt.only) {
    if (!Array.isArray(opt.only)) opt.only = [opt.only]
    actions = opt.only
  } else {
    actions = crud
  }

  for (let action of actions) {
    switch (action) {
      case 'index':
        if (opt.root === true) {
          routes.push(
            render(get('', { name: route, action }), `${route}/${action}`),
          )
        } else {
          routes.push(
            render(
              get(`${route}`, { name: route, action }),
              `${route}/${action}`,
            ),
          )
        }
        break
      case 'show':
        routes.push(
          render(
            get(`${route}/:id`, { name: route, action }),
            `${route}/${action}`,
          ),
        )
        break
      case 'new':
        routes.push(
          render(
            get(`${route}/${action}`, { name: route, action }),
            `${route}/${action}`,
          ),
        )
        break
      case 'create':
        routes.push(post(`${route}`, { name: route, action }))
        break
      case 'edit':
        routes.push(
          render(
            get(`${route}/:id/${action}`, { name: route, action }),
            `${route}/${action}`,
          ),
        )
        break
      case 'update':
        routes.push(put(`${route}/:id`, { name: route, action }))
        break
      case 'delete':
        routes.push(remove(`${route}/:id`, { name: route, action }))
        break
    }
  }

  for (let data of getCrud) {
    switch (data.method) {
      case 'get':
        routes.unshift(
          render(
            {
              ...data,
              route: `${route}/${data.route}`,
            },
            `${route}/${data.action}`,
          ),
        )
        break
      case 'post':
        routes.unshift({
          ...data,
          route: `${route}/${data.route}`,
        })
        break
      case 'put':
        routes.unshift({
          ...data,
          route: `${route}/${data.route}`,
        })
        break
      case 'delete':
        routes.unshift({
          ...data,
          route: `${route}/${data.route}`,
        })
        break
    }
  }

  return routes
}
