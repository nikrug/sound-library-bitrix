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

// Получаем все элементы SVG с классом mySvg
const svgElements = document.querySelectorAll<SVGSVGElement>('.my-svg')

// Определяем класс для изменения стилей
const activeClass = 'svg-active'

// Функция для установки состояния из localStorage
function updateSvgStates (): void {
  svgElements.forEach((svgElement, index) => {
    const path = svgElement.querySelector('path') as SVGPathElement // явное указание типа
    if (path) {
      // Получаем состояние из localStorage и конвертируем в булевый тип
      const isActive = JSON.parse(localStorage.getItem(`svg-active-${index}`) || 'false') as boolean
      if (isActive) {
        path.classList.add(activeClass)
      } else {
        path.classList.remove(activeClass)
      }
    }
  })
}

// Добавляем обработчик события клика к каждому элементу
svgElements.forEach((svgElement, index) => {
  svgElement.addEventListener('click', function () {
    const path = svgElement.querySelector('path') as SVGPathElement // явное указание типа
    if (path) {
      // Переключение класса svg-active
      path.classList.toggle(activeClass)

      // Сохраняем состояние в localStorage
      const isActive = path.classList.contains(activeClass)
      localStorage.setItem(`svg-active-${index}`, JSON.stringify(isActive)) // Преобразуем в строку
    }
  })
})

// Обновляем состояния SVG при загрузке страницы
updateSvgStates()
