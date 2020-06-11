const middleware = require('../app/middleware')
const namespace = require('../app/namespace')
const resources = require('../app/resources')
const { put } = require('../app/method')
const expect = require('chai').expect

describe('Rooter - Middleware', function () {
  const n = namespace('/admin', [resources('pages', { only: 'index' })])
  const fn = middleware(n)

  const req = {
    protocol: 'http',
    headers: {
      host: '127.0.0.1',
    },
  }

  const res = {
    locals: {},
  }

  describe(`#Request - generate 'path' and 'url' for admin access`, () => {
    it('should return -1 when the value is not equal', () => {
      fn(req, res, () => {
        expect(req.adminIndexPagesPath()).to.deep.equal('/admin/pages')
        expect(req.adminIndexPagesUrl()).to.deep.equal(
          'http://127.0.0.1/admin/pages',
        )
        expect(req.adminIndexPagesView).to.deep.equal('admin/pages/index')
      })
    })
  })

  describe(`#Responce - generate 'path' and 'url' for admin access`, () => {
    it('should return -1 when the value is not equal', () => {
      fn(req, res, () => {
        expect(res.locals.adminIndexPagesPath()).to.deep.equal('/admin/pages')
        expect(res.locals.adminIndexPagesUrl()).to.deep.equal(
          'http://127.0.0.1/admin/pages',
        )
      })
    })
  })

  //------------------------

  const n2 = namespace('/', [
    resources('pages', {}, [
      put(':id/trash', { name: 'pages', action: 'trash' }),
    ]),
  ])
  const fn2 = middleware(n2)

  const req2 = {
    protocol: 'http',
    headers: {
      host: '127.0.0.1',
    },
  }

  const res2 = {
    locals: {},
  }

  describe(`#Request - generate 'path' and 'url' for root access`, () => {
    it('should return -1 when the value is not equal', () => {
      fn2(req2, res2, () => {
        expect(req2.indexPagesPath()).to.deep.equal('/pages')
        expect(req2.indexPagesUrl()).to.deep.equal('http://127.0.0.1/pages')
        expect(req2.indexPagesView).to.deep.equal('pages/index')

        expect(req2.editPagesPath(1)).to.deep.equal('/pages/1/edit')
        expect(req2.editPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1/edit',
        )
        expect(req2.editPagesView).to.deep.equal('pages/edit')

        expect(req2.showPagesPath(1)).to.deep.equal('/pages/1')
        expect(req2.showPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
        expect(req2.showPagesView).to.deep.equal('pages/show')

        expect(req2.newPagesPath(1)).to.deep.equal('/pages/new')
        expect(req2.newPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/new')
        expect(req2.newPagesView).to.deep.equal('pages/new')

        expect(req2.createPagesPath(1)).to.deep.equal('/pages')
        expect(req2.createPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages')
        expect(req2.createPagesView).to.deep.equal(null)

        expect(req2.updatePagesPath(1)).to.deep.equal('/pages/1')
        expect(req2.updatePagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
        expect(req2.updatePagesView).to.deep.equal(null)

        expect(req2.deletePagesPath(1)).to.deep.equal('/pages/1')
        expect(req2.deletePagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
        expect(req2.deletePagesView).to.deep.equal(null)

        expect(req2.trashPagesPath(1)).to.deep.equal('/pages/1/trash')
        expect(req2.trashPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1/trash',
        )
        expect(req2.trashPagesView).to.deep.equal(null)
      })
    })
  })

  describe(`#Responce - generate 'path' and 'url' for root access`, () => {
    it('should return -1 when the value is not equal', () => {
      fn2(req2, res2, () => {
        expect(res2.locals.indexPagesPath()).to.deep.equal('/pages')
        expect(res2.locals.indexPagesUrl()).to.deep.equal(
          'http://127.0.0.1/pages',
        )

        expect(res2.locals.editPagesPath({ id: 1 })).to.deep.equal(
          '/pages/1/edit',
        )
        expect(res2.locals.editPagesUrl({ id: 1 })).to.deep.equal(
          'http://127.0.0.1/pages/1/edit',
        )

        expect(res2.locals.showPagesPath(1)).to.deep.equal('/pages/1')
        expect(res2.locals.showPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1',
        )

        expect(res2.locals.newPagesPath(1)).to.deep.equal('/pages/new')
        expect(res2.locals.newPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/new',
        )

        expect(res2.locals.createPagesPath(1)).to.deep.equal('/pages')
        expect(res2.locals.createPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages',
        )

        expect(res2.locals.updatePagesPath(1)).to.deep.equal('/pages/1')
        expect(res2.locals.updatePagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1',
        )

        expect(res2.locals.deletePagesPath(1)).to.deep.equal('/pages/1')
        expect(res2.locals.deletePagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1',
        )

        expect(res2.locals.trashPagesPath(1)).to.deep.equal('/pages/1/trash')
        expect(res2.locals.trashPagesUrl(1)).to.deep.equal(
          'http://127.0.0.1/pages/1/trash',
        )
      })
    })
  })
})
