import Player from '@vimeo/player'


const options = {
  byline: false,
  color: 'ed001c',
  portrait: false,
  title: false
}

document.querySelector('.Logo-path').addEventListener('animationend', (e) => {
  videos()
})


document.querySelectorAll('.Info-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    document.querySelector('.Info').classList.toggle('is-target')
    e.preventDefault()
  })
})

function videos() {
  document.querySelectorAll('.Embed').forEach(setupVideo)
}

function setupVideo(el) {
  const figure = el.querySelector('.Embed-figure')
  const button = el.querySelector('.Embed-play')
  const player = new Player(figure, options)

  button.addEventListener('click', (e) => {
    player.play()
    el.classList.add('is-playing')
    e.preventDefault()
  })

  player.ready().then(() => {
    el.querySelector('iframe').classList.add('Embed-iframe')
    el.classList.add('is-ready')
    player.setCurrentTime(0.05).then(() => {
      player.pause()
    })
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
