const expect = require('chai').expect
const { capitalize } = require('../../lib/utils')

describe(`#capitalize`, () => {
  it('should return -1 when the value is not equal at "User"', () => {
    const s = capitalize('user')
    expect(s).to.deep.equal('User')
  })
})
