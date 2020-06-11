const namespace = require('../app/namespace')
const resources = require('../app/resources')
const expect = require('chai').expect

describe('Rooter - Namespace', function () {
  describe(`#generate namespace`, () => {
    it('should return -1 when the value is not equal', () => {
      const n = namespace('/admin', [resources('pages', { only: 'index' })])
      expect(n).to.deep.equal({
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
