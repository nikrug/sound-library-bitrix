import noUiSlider from 'nouislider'

function formatTime (value: number): string {
  const pad = (n: number): string => ('0' + n).slice(-2)
  const mins = Math.floor(value)
  return `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`
}

window.addEventListener('DOMContentLoaded', () => {
  const sliderElements = document.querySelectorAll('.slider') // Подбираем все элементы с классом "slider"

  sliderElements.forEach((slider) => {
    const startValues = [60, 120] // Можете менять стартовые значения по вашему усмотрению
    noUiSlider.create(slider as HTMLElement, {
      start: startValues,
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
  })
})
