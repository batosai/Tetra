import { Controller } from 'stimulus'

import { Modal } from '../components'

export default class extends Controller {
  static targets = ['container']

  connect() {}

  open(event) {
    event.preventDefault()
    this.url = event.target.dataset.url
      ? event.target.dataset.url
      : event.target.href
    this.load(this.url)
  }

  close(event) {
    event.preventDefault()
    const target = this.containerTarget
    Modal.close(target.children[0])
  }

  load(url) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const target = this.containerTarget
        target.innerHTML = html
        new Modal()

        const pageLinks = Array.prototype.slice.call(
          target.querySelectorAll(
            '.pagination-link, .pagination-next, .pagination-previous',
          ),
          0,
        )
        if (pageLinks.length > 0) {
          pageLinks.forEach(el => {
            el.addEventListener('click', e => {
              e.preventDefault()
              const url = this.url.split('?')[0]
              this.load(url + el.getAttribute('href'))
            })
          })
        }
      })
  }
}
