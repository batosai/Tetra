const { get, post, put, remove } = require('../lib/method')
const expect = require('chai').expect

describe('Rooter - Method', function () {
  describe('#get', function () {
    it('should return -1 when the value is not equal', function () {
      expect(get('users', { name: 'users', action: 'index' })).to.deep.equal({
        name: 'users',
        method: 'get',
        route: 'users',
        action: 'index',
        defaultView: 'index',
      })
    })
  })

  describe('#post', function () {
    it('should return -1 when the value is not equal', function () {
      expect(post('users', { name: 'users', action: 'create' })).to.deep.equal({
        name: 'users',
        method: 'post',
        route: 'users',
        action: 'create',
        defaultView: null,
      })
    })
  })

  describe('#put', function () {
    it('should return -1 when the value is not equal', function () {
      expect(put('users', { name: 'users', action: 'update' })).to.deep.equal({
        name: 'users',
        method: 'put',
        route: 'users',
        action: 'update',
        defaultView: null,
      })
    })
  })

  describe('#delete', function () {
    it('should return -1 when the value is not equal', function () {
      expect(
        remove('users', { name: 'users', action: 'delete' }),
      ).to.deep.equal({
        name: 'users',
        method: 'delete',
        route: 'users',
        action: 'delete',
        defaultView: null,
      })
    })
  })
})
