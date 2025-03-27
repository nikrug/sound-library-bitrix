import noUiSlider from 'nouislider'

// Получаем элементы
const filter = document.querySelector<HTMLElement>('.filter')
const openButtons = document.querySelectorAll<HTMLButtonElement>('.filter__open')
const closeButtons = document.querySelectorAll<HTMLButtonElement>('.filter__close')

// Открываем модальное окно при нажатии на кнопку
openButtons.forEach(button => {
  button.addEventListener('click', () => {
    filter?.classList.add('filter__show') // Добавляем класс, чтобы показать модал
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    filter?.classList.remove('filter__show')
  })
})

// Получаем все элементы SVG с классом mySvg
const svgElements = document.querySelectorAll<SVGSVGElement>('.mySvg')

// Определяем переменные для цветов
const originalStrokeColor = '#4C526A'
const newStrokeColor = '#0432DF'
const originalFillColor = 'none' // Начальный цвет заливки
const newFillColor = '#0432DF' // Новый цвет заливки

// Добавляем обработчик события клика к каждому элементу
svgElements.forEach(svgElement => {
  svgElement.addEventListener('click', function () {
    const path = svgElement.querySelector('path')
    if (path) {
      const currentStrokeColor = path.getAttribute('stroke')
      const currentFillColor = path.getAttribute('fill')

      // Меняем цвет обводки
      if (currentStrokeColor === originalStrokeColor) {
        path.setAttribute('stroke', newStrokeColor)
      } else {
        path.setAttribute('stroke', originalStrokeColor)
      }

      // Меняем цвет заливки
      if (currentFillColor === originalFillColor) {
        path.setAttribute('fill', newFillColor)
      } else {
        path.setAttribute('fill', originalFillColor)
      }
    }
  })
})

function formatTime (value: number): string {
  const pad = (n: number): string => ('0' + n).slice(-2)
  const mins = Math.floor(value)
  return `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`
}

// Инициализируем слайдер
window.addEventListener('DOMContentLoaded', () => {
  const invertConnectsSlider = document.getElementById('invert-connects') as HTMLElement

  if (invertConnectsSlider) {
    noUiSlider.create(invertConnectsSlider, {
      start: [60, 120],
      step: 1,
      connect: true,
      range: {
        min: 0,
        max: 180
      },
      tooltips: {
        to: formatTime,
        from: (value) => {
          const num = parseFloat(value)
          return !isNaN(num) ? num : 0
        }
      }
    })
  }
})

const playPauseButtons = document.querySelectorAll<HTMLImageElement>('.play-pause-button')

playPauseButtons.forEach(button => {
  // Теперь мы ищем родительский элемент .music-player__player-song
  const audio = button.closest<HTMLElement>('.music-player__player-song')?.querySelector<HTMLAudioElement>('.audio')

  if (audio) { // Дополнительная проверка на существование элемента audio
    button.onclick = function () {
      if (audio.paused) {
        audio.play()
        button.src = '/public/images/music-img/pause-button.svg' // Иконка паузы
      } else {
        audio.pause()
        button.src = '/public/images/music-img/play-button.svg' // Иконка воспроизведения
      }
    }
  } else {
    console.error('Audio element not found for button: ', button)
  }
})
