export default class Confirm {
  constructor() {
    this.confirms = Array.prototype.slice.call(
      document.querySelectorAll('[data-confirm]'),
      0,
    )

    this.init()
  }

  init() {
    if (this.confirms.length) {
      this.confirms.forEach(el => {
        if (el.nodeName === 'FORM') {
          // Form
          el.addEventListener('submit', e => {
            e.preventDefault()
            const formData = new FormData(el)
            const method = formData.get('_method')
              ? formData.get('_method')
              : el.method

            if (confirm(el.dataset.confirm)) {
              this.fetchData(el.action, method, formData)
            }
          })
        } else {
          // Link
          el.addEventListener('click', e => {
            e.preventDefault()

            if (confirm(el.dataset.confirm)) {
              if (el.dataset.method) {
                this.fetchData(el.href, el.dataset.method)
              } else {
                window.location = el.href
              }
            }
          })
        }
      })
    }
  }

  fetchData(url, method, formData = []) {
    const data = {}
    formData.forEach(function(value, key) {
      if (key.includes('[]')) {
        const k = key.replace('[]', '')
        if (data[k] === undefined) {
          data[k] = []
        }
        data[k].push(value)
      } else {
        data[key] = value
      }
    })

    fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute('content'),
      },
      credentials: 'same-origin',
    })
      .then(response => {
        if (response.ok) {
          location.reload()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch(error => {
        console.log(error)
        alert('add notif')
      })
  }
}
