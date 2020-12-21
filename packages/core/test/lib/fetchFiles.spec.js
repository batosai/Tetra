const path = require('path')
const expect = require('chai').expect
const { fetchFiles } = require('../../lib/utils')

describe(`#fetchFiles`, () => {
  it('should return -1 when result is not equal to sample.pdf file', async () => {
    const filesList = await fetchFiles(path.join(__dirname, '../fixtures/*.pdf'))
    expect(filesList).to.deep.equal([ path.join(__dirname, '../fixtures/sample.pdf') ])
  })

})
