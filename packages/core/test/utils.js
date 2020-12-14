const utils = require('../lib/utils')
const expect = require('chai').expect

describe('Rooter - Utils', function () {
  describe(`#capitalize`, () => {
    it('should return -1 when the value is not equal at "User"', () => {
      const s = utils.capitalize('user')
      expect(s).to.deep.equal('User')
    })
  })
})
