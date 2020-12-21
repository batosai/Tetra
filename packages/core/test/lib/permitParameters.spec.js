const expect = require('chai').expect
const { permitParameters } = require('../../lib/utils')

describe(`#permitParameters`, () => {
  it('should return -1 when a param is missing', () => {
    const body = { title: 'my title', slug: 'my-title' }

    const params = permitParameters(['title', 'slug'], body, false)

    expect(params).to.deep.equal(body)
  })

  it('should return -1 when a param is not missing', () => {
    const body = { title: 'my title' }

    const params = permitParameters(['title', 'slug'], body, false)

    expect(params).to.not.deep.equal({
      title: 'my title',
      slug: 'my-title',
    })
  })

  it('should return -1 when a param is to much', () => {
    const body = { title: 'my title', slug: 'my-title', name: 'my-name' }

    const params = permitParameters(['title', 'slug'], body, false)

    expect(params).to.deep.equal({
      title: 'my title',
      slug: 'my-title',
    })
  })

  it('should return -1 when a param is missing and not blank', () => {
    const body = { title: 'my title', slug: '' }

    const params = permitParameters(['title', 'slug'], body, false)

    expect(params).to.deep.equal({ title: 'my title' })
  })

  it('should return -1 when a param is missing and blank', () => {
    const body = { title: 'my title', slug: '' }

    const params = permitParameters(['title', 'slug'], body, true)

    expect(params).to.deep.equal(body)
  })
})
