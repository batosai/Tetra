const path = require('path')
const expect = require('chai').expect
const { fetchIn } = require('../../lib/utils')

describe(`#fetchIn`, () => {
  it('should return -1 when result is not equal to sample.pdf file', async () => {
    const filesList = await fetchIn(path.join(__dirname, '../fixtures/*.pdf'))
    expect(filesList).to.deep.equal([ path.join(__dirname, '../fixtures/sample.pdf') ])
  })

})
