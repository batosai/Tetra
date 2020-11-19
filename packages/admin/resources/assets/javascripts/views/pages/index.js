import _Form from './form'

// document.addEventListener('DOMContentLoaded', () => {
//   const source = document.querySelector('.js-checkbox__select-all')
//   const checkboxes = Array.prototype.slice.call(
//     document.querySelectorAll('.js-checkbox'),
//     0,
//   )
//   const selectedLine = el => {
//     if (el.checked) {
//       el.parentNode.parentNode.parentNode.parentNode.classList.add(
//         'is-selected',
//       )
//     } else {
//       el.parentNode.parentNode.parentNode.parentNode.classList.remove(
//         'is-selected',
//       )
//     }
//   }
//
//   if (checkboxes.length > 0) {
//     source.addEventListener('click', () => {
//       checkboxes.forEach(el => {
//         el.checked = source.checked
//         selectedLine(el)
//       })
//     })
//
//     checkboxes.forEach(el => {
//       el.addEventListener('click', () => {
//         selectedLine(el)
//       })
//     })
//   }
// })
export default class Index {
  constructor() {
    this.source = document.querySelector('.js-checkbox__select-all')
    this.checkboxes = Array.prototype.slice.call(
      document.querySelectorAll('.js-checkbox'),
      0,
    )
    this.selectedLine = el => {
      if (el.checked) {
        el.parentNode.parentNode.parentNode.parentNode.classList.add(
          'is-selected',
        )
      } else {
        el.parentNode.parentNode.parentNode.parentNode.classList.remove(
          'is-selected',
        )
      }
    }

    this.init()
    new _Form()
  }

  init() {
    if (this.checkboxes.length > 0) {
      this.source.addEventListener('click', () => {
        this.checkboxes.forEach(el => {
          el.checked = this.source.checked
          this.selectedLine(el)
        })
      })

      this.checkboxes.forEach(el => {
        el.addEventListener('click', () => {
          this.selectedLine(el)
        })
      })
    }
  }
}
