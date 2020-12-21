const expect = require('chai').expect
const qs = require('../../lib/qs')

describe(`#queryString`, () => {
  it('should return -1 when the value is not equal at "page=2&state=draft&title=page&order=ASC"', () => {
    const q = qs(
      { page: 2 },
      { state: 'draft', title: 'page' },
      { order: 'ASC' },
    )
    expect(q).to.deep.equal('page=2&state=draft&title=page&order=ASC')
  })
})
