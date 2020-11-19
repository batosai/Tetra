const queue = []

class Notification {
  constructor(data) {
    this.state = {
      text: '',
      type: '',
      ...data,
    }

    this.dom()

    if (!queue.length) {
      this.render()
    }
    queue.push(this)
  }

  dom() {
    const push = document.createElement('div')
    const deleteButton = document.createElement('button')
    const content = document.createTextNode(this.state.text)

    push.classList.add(
      'notification',
      'push',
      this.state.type ? this.state.type : null,
    )
    deleteButton.classList.add('delete')

    push.appendChild(deleteButton)
    push.appendChild(content)

    deleteButton.addEventListener('click', this.close.bind(this))

    this.state.push = push
    this.state.container = document.querySelector('.notifications')
  }

  close() {
    this.state.push.classList.toggle('reverse')
    this.state.push.addEventListener(
      'animationend',
      this.remove.bind(this),
      false,
    )
  }

  remove() {
    this.state.push.remove()

    queue.shift()
    if (queue.length) {
      queue[0].render()
    }
  }

  render() {
    if (this.state.container) {
      this.state.container.appendChild(this.state.push)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  container.classList.add('notifications')
  document.body.appendChild(container)

  // new Notification({
  //   text: 'Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.',
  //   type: 'is-danger'
  // })
  //
  // new Notification({
  //   text: 'Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.',
  //   type: 'is-info'
  // })
  //
  // new Notification({
  //   text: 'Primar lorem ipsum dolor sit amet.',
  //   type: 'is-warning'
  // })
  //
  // new Notification({
  //   text: 'Primar lorem ipsum dolor sit amet.',
  // })
})
