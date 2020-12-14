const namespace = require('../lib/namespace')
const resources = require('../lib/resources')
const expect = require('chai').expect

describe('Rooter - Namespace', function () {
  describe(`#generate namespace`, () => {
    it('should return -1 when the value is not equal', () => {
      const ns = namespace('/admin', [resources('pages', { only: 'index' })])
      expect(ns).to.deep.equal({
        admin: [
          {
            name: 'pages',
            method: 'get',
            route: '/pages',
            action: 'index',
            defaultView: 'admin/pages/index',
          },
        ],
      })
    })
  })
})
