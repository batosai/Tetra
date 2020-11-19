export default class Modal {
  constructor() {
    this.modals = Array.prototype.slice.call(
      document.querySelectorAll('.js-modal'),
      0,
    )
    this.bts = Array.prototype.slice.call(
      document.querySelectorAll('.js-has-modal'),
      0,
    )

    this.init()
  }

  init() {
    if (this.modals.length > 0) {
      this.modals.forEach(el => {
        const closes = Array.prototype.slice.call(
          el.querySelectorAll('.js-modal-close'),
          0,
        )
        closes.forEach(elmt => {
          elmt.addEventListener('click', e => {
            e.preventDefault()
            Modal.close(el)
          })
        })
      })
      document.querySelector('html').classList.add('is-clipped')
    }

    if (this.bts.length > 0) {
      this.bts.forEach(el => {
        el.addEventListener('click', () => {
          document
            .querySelector(`#${el.dataset.modal}`)
            .classList.add('is-active')
        })
      })
    }
  }

  static close(el) {
    el.classList.remove('is-active')

    document.querySelector('html').classList.remove('is-clipped')
  }
}
