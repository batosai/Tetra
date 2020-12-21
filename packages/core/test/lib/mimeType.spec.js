const expect = require('chai').expect
const { mimeType } = require('../../lib/utils')

describe(`#mimeType`, () => {
  it('should return -1 when the value is not equal at "archive"', () => {
    const mt = mimeType('application/gzip')
    expect(mt).to.deep.equal('archive')
  })
})
