export default class Navbar {
  constructor() {
    this.navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0,
    )

    this.init()
  }

  init() {
    if (this.navbarBurgers.length > 0) {
      this.navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = document.getElementById(el.dataset.target)
          document.querySelector('html').classList.toggle('is-clipped')

          el.classList.toggle('is-active')
          target.parentNode.classList.toggle('has-mobile')
          target.parentNode.classList.toggle('is-hidden-mobile')
        })
      })
    }
  }
}
