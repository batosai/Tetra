import '../../stylesheets/aside.scss'

export default class Aside {
  constructor() {
    this.objects = Array.prototype.slice.call(
      document.querySelectorAll('.menu-list > li > a'),
      0,
    )

    this.init()
  }

  init() {
    if (this.objects.length > 0) {
      this.objects.forEach(el => {
        el.addEventListener('click', () => {
          el.classList.toggle('is-active')
          if (el.nextSibling) {
            el.nextSibling.classList.toggle('has-open')

            if (el.classList.contains('is-active')) {
              el.children[0].children[0].setAttribute(
                'data-fa-transform',
                'rotate-270',
              )
            } else {
              el.children[0].children[0].setAttribute(
                'data-fa-transform',
                'rotate-180',
              )
            }
          }
        })
      })
    }
  }
}
