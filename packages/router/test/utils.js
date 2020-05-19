const utils = require('../app/utils/')
const expect = require('chai').expect

describe('Rooter - Utils', function() {

  describe(`#capitalize`, () => {
    it('should return -1 when the value is not equal at "User"', () => {
      const s = utils.capitalize('user')
      expect(s).to.deep.equal('User')
    })
  })

  describe(`#defaultView`, () => {
    it('should return -1 when the value is not equal at "users/index"', () => {
      const s = utils.defaultView('/users/index')
      expect(s).to.deep.equal('users/index')
    })
  })

  describe(`#parseParameters`, () => {
    it('should return -1 when the value is not equal at "/users/9/edit"', () => {
      const route = utils.parseParameters('/users/:id/edit', 9)
      expect(route).to.deep.equal('/users/9/edit')
    })

    it('should return -1 when the value is not equal at "/users/9/edit/title"', () => {
      const route = utils.parseParameters('/users/:id/edit/:name', { id: 9, name: 'title' })
      expect(route).to.deep.equal('/users/9/edit/title')
    })
  })

})
