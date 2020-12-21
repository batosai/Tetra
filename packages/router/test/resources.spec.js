const resources = require('../lib/resources')
const { post } = require('../lib/method')
const expect = require('chai').expect

const index = {
  name: 'pages',
  method: 'get',
  route: 'pages',
  action: 'index',
  defaultView: 'pages/index',
}

const show = {
  name: 'pages',
  method: 'get',
  route: 'pages/:id',
  action: 'show',
  defaultView: 'pages/show',
}

const newPage = {
  name: 'pages',
  method: 'get',
  route: 'pages/new',
  action: 'new',
  defaultView: 'pages/new',
}

const create = {
  name: 'pages',
  method: 'post',
  route: 'pages',
  action: 'create',
  defaultView: null,
}

const edit = {
  name: 'pages',
  method: 'get',
  route: 'pages/:id/edit',
  action: 'edit',
  defaultView: 'pages/edit',
}

const update = {
  name: 'pages',
  method: 'put',
  route: 'pages/:id',
  action: 'update',
  defaultView: null,
}

const remove = {
  name: 'pages',
  method: 'delete',
  route: 'pages/:id',
  action: 'delete',
  defaultView: null,
}

const data = { index, show, new: newPage, create, edit, update, delete: remove }

const crud = ['index', 'show', 'new', 'create', 'edit', 'update', 'delete']
const options = [
  {},
  { only: 'index' },
  { only: ['index'] },
  { only: ['index', 'show'] },
  { only: ['index', 'show'] },
  { only: ['index', 'show', 'new'] },
  { only: ['index', 'show', 'new', 'create'] },
  { only: ['index', 'show', 'new', 'create', 'edit'] },
  { only: ['index', 'show', 'new', 'create', 'edit', 'update'] },
  { only: ['index', 'show', 'new', 'create', 'edit', 'update', 'delete'] },
  { except: ['index', 'show', 'new', 'create', 'edit', 'update', 'delete'] },
  { except: ['index', 'show', 'new', 'create', 'edit', 'update'] },
  { except: ['index', 'show', 'new', 'create', 'edit'] },
  { except: ['index', 'show', 'new', 'create'] },
  { except: ['index', 'show', 'new'] },
  { except: ['index', 'show'] },
  { except: ['index'] },
  { except: 'index' },
]

describe('Rooter - Ressources', function () {
  options.map((opt) => {
    describe(`#generate resources - option ${JSON.stringify(opt)}`, () => {
      it('should return -1 when the value is not equal', () => {
        let d = []
        if (opt.only) {
          if (!Array.isArray(opt.only)) {
            opt.only = [opt.only]
          }
          d = opt.only.map((o) => data[o])
        } else if (opt.except) {
          if (!Array.isArray(opt.except)) {
            opt.except = [opt.except]
          }

          actions = crud.filter((i) => opt.except.indexOf(i) === -1)
          d = actions.map((o) => data[o])
        } else {
          d = [index, show, newPage, create, edit, update, remove]
        }
        expect(resources('pages', opt)).to.deep.equal(d)
      })
    })
  })

  describe(`#generate resources - option {} and add custom method`, () => {
    it('should return -1 when the value is not equal', () => {
      const r = resources('pages', { only: 'index' }, [
        post('duplicate', { name: 'duplicate', action: 'duplicate' }),
      ])

      expect(r).to.deep.equal([
        {
          name: 'duplicate',
          method: 'post',
          route: 'pages/duplicate',
          action: 'duplicate',
          defaultView: null,
        },
        index,
      ])
    })
  })
})
