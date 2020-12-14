const RouteService = require('../app/Services/RouteService')
const namespace = require('../lib/namespace')
const resources = require('../lib/resources')
const { put } = require('../lib/method')
const expect = require('chai').expect

const req = {
  protocol: 'http',
  headers: {
    host: '127.0.0.1',
  },
}

const res = {
  locals: {},
}

describe('Rooter - Middleware', function () {
  const ns = namespace('/admin', [resources('pages', { only: 'index' })])
  RouteService.handle(ns, { req, res })

  describe(`#Request - generate 'path' and 'url' for admin access`, () => {
    it('should return -1 when the value is not equal', () => {
      expect(req.adminIndexPagesPath()).to.deep.equal('/admin/pages')
      expect(req.adminIndexPagesUrl()).to.deep.equal(
        'http://127.0.0.1/admin/pages',
      )
      expect(req.adminIndexPagesView).to.deep.equal('admin/pages/index')
    })
  })

  describe(`#Response - generate 'path' and 'url' for admin access`, () => {
    it('should return -1 when the value is not equal', () => {
      expect(res.locals.adminIndexPagesPath()).to.deep.equal('/admin/pages')
      expect(res.locals.adminIndexPagesUrl()).to.deep.equal(
        'http://127.0.0.1/admin/pages',
      )
    })
  })

  //------------------------

  const ns2 = namespace('/', [
    resources('pages', {}, [
      put(':id/trash', { name: 'pages', action: 'trash' }),
    ]),
  ])
  RouteService.handle(ns2, { req, res })

  describe(`#Request - generate 'path' and 'url' for root access`, () => {
    it('should return -1 when the value is not equal', () => {
      expect(req.indexPagesPath()).to.deep.equal('/pages')
      expect(req.indexPagesUrl()).to.deep.equal('http://127.0.0.1/pages')
      expect(req.indexPagesView).to.deep.equal('pages/index')

      expect(req.editPagesPath(1)).to.deep.equal('/pages/1/edit')
      expect(req.editPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1/edit',
      )
      expect(req.editPagesView).to.deep.equal('pages/edit')

      expect(req.showPagesPath(1)).to.deep.equal('/pages/1')
      expect(req.showPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
      expect(req.showPagesView).to.deep.equal('pages/show')

      expect(req.newPagesPath(1)).to.deep.equal('/pages/new')
      expect(req.newPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/new')
      expect(req.newPagesView).to.deep.equal('pages/new')

      expect(req.createPagesPath(1)).to.deep.equal('/pages')
      expect(req.createPagesUrl(1)).to.deep.equal('http://127.0.0.1/pages')
      expect(req.createPagesView).to.deep.equal(null)

      expect(req.updatePagesPath(1)).to.deep.equal('/pages/1')
      expect(req.updatePagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
      expect(req.updatePagesView).to.deep.equal(null)

      expect(req.deletePagesPath(1)).to.deep.equal('/pages/1')
      expect(req.deletePagesUrl(1)).to.deep.equal('http://127.0.0.1/pages/1')
      expect(req.deletePagesView).to.deep.equal(null)

      expect(req.trashPagesPath(1)).to.deep.equal('/pages/1/trash')
      expect(req.trashPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1/trash',
      )
      expect(req.trashPagesView).to.deep.equal(null)
    })
  })

  describe(`#Response - generate 'path' and 'url' for root access`, () => {
    it('should return -1 when the value is not equal', () => {
      expect(res.locals.indexPagesPath()).to.deep.equal('/pages')
      expect(res.locals.indexPagesUrl()).to.deep.equal(
        'http://127.0.0.1/pages',
      )

      expect(res.locals.editPagesPath({ id: 1 })).to.deep.equal(
        '/pages/1/edit',
      )
      expect(res.locals.editPagesUrl({ id: 1 })).to.deep.equal(
        'http://127.0.0.1/pages/1/edit',
      )

      expect(res.locals.showPagesPath(1)).to.deep.equal('/pages/1')
      expect(res.locals.showPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1',
      )

      expect(res.locals.newPagesPath(1)).to.deep.equal('/pages/new')
      expect(res.locals.newPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/new',
      )

      expect(res.locals.createPagesPath(1)).to.deep.equal('/pages')
      expect(res.locals.createPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages',
      )

      expect(res.locals.updatePagesPath(1)).to.deep.equal('/pages/1')
      expect(res.locals.updatePagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1',
      )

      expect(res.locals.deletePagesPath(1)).to.deep.equal('/pages/1')
      expect(res.locals.deletePagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1',
      )

      expect(res.locals.trashPagesPath(1)).to.deep.equal('/pages/1/trash')
      expect(res.locals.trashPagesUrl(1)).to.deep.equal(
        'http://127.0.0.1/pages/1/trash',
      )
    })
  })
})
