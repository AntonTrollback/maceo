const Player = require('@vimeo/player')

const smoothscroll = require('smoothscroll-polyfill')

smoothscroll.polyfill()

const options = {
  byline: false,
  color: 'ed001c',
  portrait: false,
  title: false
}

videos()

document.querySelectorAll('.js-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    document.querySelector('.Info').classList.toggle('is-target')
    document.documentElement.classList.toggle('is-overlaid')
    e.preventDefault()
  })
})

document.querySelector('.Intro-link').addEventListener('click', (e) => {
  document.querySelector('#work').scrollIntoView({ behavior: 'smooth', block: 'start' })
  e.preventDefault()
})

function videos() {
  document.querySelectorAll('.Embed').forEach(setupVideo)
}

function setupVideo(el) {
  const figure = el.querySelector('.Embed-figure')
  const button = el.querySelector('.Embed-link')
  const player = new Player(figure, options)

  button.addEventListener('click', (e) => {
    el.classList.add('is-playing')
    e.preventDefault()
    player.play()
  })

  player.ready().then(() => {
    el.querySelector('iframe').classList.add('Embed-iframe')
    el.classList.add('is-ready')
  })

  player.on('pause', (data) => {
    el.classList.remove('is-playing')
  })

  player.on('ended', (data) => {
    el.classList.add('is-notAnimated')
    el.classList.remove('is-playing')
    player.setCurrentTime(0).then(() => {
      player.pause()
    })
  })
}
