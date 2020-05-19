# @tetra/router

Declaration routes.
It's possible auto-generate CRUD routes.

```
const { namespace, root, resources, get, post, put, remove } = require('@tetra/router')
```

## Namespace

```
namespace('/admin', [
  root('home'),
  resources('pages', { except: 'show' }, [
    put(':id/trash', { name: 'pages', action: 'trash' }),
    put('trash', { name: 'pages', action: 'sendToTrash' }),
    remove('trash', { name: 'pages', action: 'deleteSelected' }),
  ]),
  resources('settings', { only: ['index', 'update'] })
])

/* routes
*
* GET /
*
* GET /admin/pages
* GET /admin/pages/new
* POST /admin/pages
* GET /admin/pages/:id/edit
* PUT /admin/pages/:id
* DELETE /admin/pages/:id
* PUT /admin/pages/:id/trash
* PUT /admin/pages/trash
* DELETE /admin/pages/trash
*
* GET /admin/settings
* PUT /admin/settings/:id
*
*/
```

---
## Root

Add `/` route

```
root('home') // equal to resources('home', { only: 'index', root: true })
```

---
## Method
  - get
  - post
  - put
  - remove

  `[method](path, options)`

  options (object): parameters are name and action controllers

  Return object: informations route/controller/view

```
get('users', { name: 'users', action: 'index' })
// return object
{
  name: 'users',
  method: 'get',
  route: 'users',
  action: 'index',
  defaultView: 'index'
}
```

---
## Resources

`resources('name', options, methods)`

 - options (object): parameters are only, except and root
 - only/except (string or array): `index`, `show`, `new`, `create`, `edit`, `update`, `delete`
 - root (true|false): defined resources root
 - methods (array optionnal): specify methods

 Return array object method

```
resources('settings', {})
/* all CRUD routes
*
* GET /settings
* GET /settings/new
* POST /settings
* GET /settings/:id/edit
* PUT /settings/:id
* DELETE /settings/:id
*
*/

resources('settings', { only: 'index' })
// GET /settings

resources('settings', { except: ['index', 'update'] })
/* all CRUD routes
*
* GET /settings/new
* POST /settings
* GET /settings/:id/edit
* DELETE /settings/:id
*
*/
```

---
## Middleware
- ...Path(options): return path string
- ...Url(options): return url string
- ..View: return path template

options (int or object)

```
sample:

// /admin/pages/:id/edit
adminEditPagesPath({ id: 2 }) equal adminEditPages(2)
// /admin/pages/2/edit

// /admin/pages/trash/:params1/page/:params2
adminTrashPagesPath({ params1: 2, params2: 3 })
// /admin/pages/trash/2/page/3

// /admin/pages/trash/:params1
adminTrashPagesPath({ params1: 2, page: 3 })
// /admin/pages/trash/2?page=3

/*
* adminIndexHomePath() | adminIndexHomeUrl() | adminIndexHomeView
*
* adminIndexPages[Path()|Url()|View]
* adminNewPages[Path()|Url()|View]
* adminCreatePages[Path()|Url()|View]
* adminEditPages[Path(:id)|Url(:id)|View]
* adminUpdatePages[Path(:id)|Url(:id)|View]
* adminDeletePages[Path(:id)|Url(:id)|View]
* adminSendToTrashPages[Path(:id)|Url(:id)|View]
* adminDeleteSelectedPages[Path()|Url()|View]
* adminTrashPages[Path()|Url()|View]
*
* adminIndexSettings[Path()|Url()|View]
* adminUpdateSettings[Path(:id)|Url(:id)|View]
*
*/
```

---
## Controller
Controller routes. Defined middleware in controller.

```
class PagesController extends ApplicationController {
  constructor() {
    this.middlewares = [
      { action: csrfProtection, only: 'index' },
      { actions: [csrfProtection], only: ['index'] },
      { actions: [csrfProtection], except: ['index'] }
      { action: this.setLocale, except: 'index' }
      { action: this.setLocale } // for all
    ]
  }

  async index(req, res, next) {...}
  async new(req, res, next) {...}
  async create(req, res, next) {...}
  async edit(req, res, next) {...}
  async update(req, res, next) {...}
  async delete(req, res, next) {...}
  async trash(req, res, next) {...}
  async sendToTrash(req, res, next) {...}
  async deleteSelected(req, res, next) {...}

  async setLocale(req, res, next) {...}
}

```

<jeremy@chaufourier.fr>
