import './bulma'
import './components/megamenu'
import './components/uploader'
// import './components/notification'
import { Pages } from './views'
import { Confirm, Navbar, Aside, Modal, Editor, Datepicker } from './components'

import { Application } from 'stimulus'
import { definitionsFromContext } from '@tetrajs/webpack/resources/contexts/stimulus'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

new Pages()
new Editor()
new Datepicker()
new Modal()
new Navbar()
new Confirm()
new Aside()
