const { Page } = require('@tetra/core').models

module.exports = class PagesService {
  static async fetchPages(req, limit = 10) {
    const filter = req.parameters(['state', 'title'], req.query, false)
    const options = {
      page: req.query.page ? req.query.page : 1,
      limit,
    }

    let query = filter
    if (filter.title) {
      query = { ...filter, title: new RegExp(filter.title, 'i') }
    }

    return await Page.paginate(query, options)
  }

  static async newPage() {
    const page = new Page()
    page.state = page.schema.path('state').enumValues[0]
    return page
  }

  static async createPage(req) {
    const params = req.parameters(
      [
        'title',
        'slug',
        'content',
        'tags',
        'order',
        'image',
        'state',
        'publishedAt',
      ],
      req.body.page,
      false,
    )
    params.language = req.getLocale()
    return new Page(params)
  }

  static async updatePage(req) {
    const page = await PagesService.findById(req.params.id)

    const params = req.parameters(
      [
        'title',
        'slug',
        'content',
        'tags',
        'order',
        'image',
        'state',
        'publishedAt',
      ],
      req.body.page,
      false,
    )

    page.set(params)
    return page
  }

  static async findById(id) {
    return await Page.findById(id).populate('image')
  }

  static async deleteOne(id) {
    await Page.deleteOne({ _id: { $in: id } })
  }

  static async deleteMany(ids = null) {
    if (ids) {
      await Page.deleteMany({ _id: { $in: ids } })
    } else {
      await Page.deleteMany({ state: Page.schema.path('state').enumValues[2] })
    }
  }

  static async updateOne(id) {
    await Page.updateOne(
      { _id: { $in: id } },
      { state: Page.schema.path('state').enumValues[2] },
    )
  }

  static async updateMany(ids) {
    await Page.updateMany(
      { _id: { $in: ids } },
      { state: Page.schema.path('state').enumValues[2] },
    )
  }
}
