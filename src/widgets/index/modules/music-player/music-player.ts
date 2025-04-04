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

// Закрываем фильтр при клике за пределами фильтра
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  // Проверяем, кликнули ли на фильтр или на одну из кнопок
  if (filter && !filter.contains(target) && !Array.from(openButtons).includes(target as HTMLButtonElement)) {
    filter.classList.remove('filter__show')
  }
})


document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll<HTMLElement>('.tab-btn')
  const tabContents = document.querySelectorAll<HTMLElement>('.music-player__tab-content')

  tabButtons.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove the active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('tab-active'))
      // Hide all content
      tabContents.forEach(content => content.classList.remove('active'))

      // Add active class to the clicked tab
      tab.classList.add('tab-active')

      // Ensure that the index is valid before accessing tabContents
      if (index >= 0 && index < tabContents.length) {
        tabContents[index].classList.add('active') // Show corresponding content
      }
    })
  })

  // Show the first tab and its content initially
  if (tabButtons.length > 0) {
    tabButtons[0].click()
  }
})
