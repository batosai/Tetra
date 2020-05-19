const root = require('../app/root')
const expect = require('chai').expect

describe('Rooter - Root', function() {

  describe(`#generate root`, () => {
    it('should return -1 when the value is not equal', () => {
      const r = root('home')
      expect(r).to.deep.equal(
        [
          {
            name: 'home',
            method: 'get',
            route: '',
            action: 'index',
            defaultView: 'home/index'
          }
        ]
      )
    })
  })

})
