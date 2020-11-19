import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['image', 'informations', 'preview', 'id']

  connect() {}

  select(event) {
    const informations = this.informationsTarget
    const elmt = event.target.closest('.column')

    const isSelected = elmt.classList.contains('selected')

    this.imageTargets.forEach(el => {
      el.classList.remove('selected')
    })

    if (!isSelected) {
      elmt.classList.add('selected')
      this.load(elmt.dataset.url)
      informations.closest('.column').classList.remove('hide')
    } else {
      informations.closest('.column').classList.add('hide')
    }
  }

  choose(event) {
    const id = event.target.dataset.id
    this.idTargets.forEach(el => {
      el.setAttribute('value', id)
    })

    if (this.hasPreviewTarget) {
      this.previewTarget
        .querySelector('img')
        .setAttribute('src', `/admin/attachments/${id}`)
    }
  }

  load(url) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const target = this.informationsTarget
        target.innerHTML = html
      })
  }
}
