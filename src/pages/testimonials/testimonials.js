const sections = document.querySelectorAll('.experiens__customer-section');
const dots = document.querySelectorAll('.experiens__pagination button');
let currentSectionIndex = 0;

function updateSections() {
    sections.forEach((section, index) => {
        if (index === currentSectionIndex) {
            section.classList.add('active');
            section.style.display = 'flex'; // Показываем активную секцию
            section.style.flexdirection = 'row'; // Показываем активную секцию
            // Небольшая задержка для анимации
            setTimeout(() => {
                section.style.opacity = 1; // Делаем секцию видимой
                section.style.transform = 'translateX(0)'; // Восстанавливаем позицию
            }, 50); // Чтоб анмитация успела сработать
        } else {
            section.style.opacity = 0; // Скрываем неактивные секции
            section.style.transform = 'translateX(20px)'; // Сдвигаем вниз
            section.style.display = 'none'; // Убираем их из потока
            section.classList.remove('active'); // Удаляем активный класс
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSectionIndex) {
            dot.classList.add('active');
        }
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSectionIndex = index;
        updateSections();
    });
});

// Начальная настройка
updateSections();
