const BaseController = require('../app/baseController')
const expect = require('chai').expect

const fackMiddleware = () => {}
const fack2Middleware = () => {}
const fack3Middleware = () => {}
const fack4Middleware = () => {}
const fack5Middleware = () => {}

class PageController extends BaseController {
  constructor() {
    super()
    this.middlewares = [
      { action: fackMiddleware },
      { actions: [fack2Middleware, fack3Middleware], only: 'create' },
      { actions: [fackMiddleware, fack3Middleware], only: ['index', 'delete'] },
      { action: fack4Middleware, except: ['create', 'update'] },
      { actions: [fack5Middleware], except: 'delete' },
    ]
  }
}

const controller = new PageController()

describe('Rooter - Controller', function () {
  describe(`#generate array middleware for only 'index' action`, () => {
    it('should return -1 when the value is not equal', () => {
      const e = controller.middlewaresToArray('index')
      expect(e).to.deep.equal([
        fackMiddleware,
        fack3Middleware,
        fack4Middleware,
        fack5Middleware,
      ])
    })
  })

  describe(`#generate array middleware for only 'create' action`, () => {
    it('should return -1 when the value is not equal', () => {
      const e = controller.middlewaresToArray('create')
      expect(e).to.deep.equal([
        fackMiddleware,
        fack2Middleware,
        fack3Middleware,
        fack5Middleware,
      ])
    })
  })

  describe(`#generate array middleware for only 'delete' action`, () => {
    it('should return -1 when the value is not equal', () => {
      const e = controller.middlewaresToArray('delete')
      expect(e).to.deep.equal([
        fackMiddleware,
        fack3Middleware,
        fack4Middleware,
      ])
    })
  })

  describe(`#generate array middleware for only 'update' action`, () => {
    it('should return -1 when the value is not equal', () => {
      const e = controller.middlewaresToArray('update')
      expect(e).to.deep.equal([fackMiddleware, fack5Middleware])
    })
  })
})
