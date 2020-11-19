const ApplicationController = require('./ApplicationController')
const { PagesService } = require('../services')
const { Page } = require('@tetrajs/core').models

module.exports = class PagesController extends ApplicationController {
  async index(req, res, next) {
    const filter = req.permitParameters(['state', 'title'], req.query, false)
    const paginate = await PagesService.fetchPages(req)
    res.render(req.adminIndexPagesView, {
      title: 'page',
      paginate,
      filter,
      states: Page.schema.path('state').enumValues,
    })
  }

  async new(req, res, next) {
    const page = await PagesService.newPage()

    res.render(req.adminNewPagesView, {
      title: 'page',
      page,
      errors: {},
    })
  }

  async create(req, res, next) {
    const page = await PagesService.createPage(req)
    const promise = page.save()

    promise.then(() => res.redirect(req.adminIndexPagesPath()))
    promise.catch(err =>
      res.render(req.adminNewPagesView, {
        title: 'page',
        page,
        errors: err.errors,
      }),
    )
  }

  async edit(req, res, next) {
    const page = await PagesService.findById(req.params.id)

    res.render(req.adminEditPagesView, {
      title: 'page',
      page,
      errors: {},
    })
  }

  async update(req, res, next) {
    const page = await PagesService.updatePage(req)
    const promise = page.save()

    promise.then(() => res.redirect(req.adminIndexPagesPath()))
    promise.catch(err =>
      res.render(req.adminEditPagesView, {
        title: 'page',
        page,
        errors: err.errors,
      }),
    )
  }

  async delete(req, res, next) {
    try {
      await PagesService.deleteOne(req.params.id)
    } catch (error) {
      res.status(400).json()
    }
    res.json()
  }

  async trash(req, res, next) {
    try {
      await PagesService.updateOne(req.params.id)
    } catch (error) {
      res.status(400).json()
    }
    res.json()
  }

  async sendToTrash(req, res, next) {
    try {
      await PagesService.updateMany(req.body.ids)
    } catch (error) {
      res.status(400).json()
    }
    res.json()
  }

  async deleteSelected(req, res, next) {
    try {
      if (req.body.id) {
        await PagesService.deleteMany(req.body.ids)
      } else {
        await PagesService.deleteMany()
      }
    } catch (error) {
      res.status(400).json()
    }
    res.json()
  }
}
