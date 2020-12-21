const path = require('path')
const expect = require('chai').expect
const { exist } = require('../../lib/utils')

describe(`#exist`, () => {
  it('should return -1 when the file is not exist', async () => {
    const e = await exist(path.join(__dirname, '../fixtures/sample.pdf'))
    expect(e).to.deep.equal(true)
  })

  it('should return -1 when the file is exist', async () => {
    const e = await exist(path.join(__dirname, '../fixtures/not_exist.pdf'))
    expect(e).to.not.equal(true)
  })
})
