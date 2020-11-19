export default class Form {
  constructor() {
    this.publish = document.querySelector('#publish')
    this.draft = document.querySelector('#draft')

    this.pickers = Array.prototype.slice.call(
      document.querySelectorAll('[type="date"]'),
      0,
    )

    this.init()
  }

  init() {
    if (this.publish) {
      this.publish.addEventListener('click', () => {
        this.pickers.forEach(el => {
          el.removeAttribute('disabled')
        })
      })
    }

    if (this.draft) {
      this.draft.addEventListener('click', () => {
        this.pickers.forEach(el => {
          el.setAttribute('disabled', true)
        })
      })
    }
  }
}
