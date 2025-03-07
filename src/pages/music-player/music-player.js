
    // Получаем элементы
            const filter = document.querySelector(".filter");
            const openButtons = document.querySelectorAll(".filter__open");
            const closeButton = document.querySelectorAll(".filter__close");
            
    
            // Открываем модальное окно при нажатии на кнопку
            openButtons.forEach(button => {
                button.addEventListener("click", () => {
                    filter.classList.add("filter__show"); // Добавляем класс, чтобы показать модал
                });
            });
    
            closeButton.forEach(button=> {
                button.addEventListener("click",()=>{
                 filter.classList.remove("filter__show");
                })
            });

// Функция для инициализации аудиоплееров




function changeColor(event) {
    const target = event.target; 

    // Проверяем, является ли элемент <svg> или <path>
    if (target.tagName === 'svg') {
        const path = target.querySelector('path');
        const currentFill = path.getAttribute('fill');

        // Если fill не установлен, меняем цвет
        if (currentFill === 'none' || currentFill === '') {
            path.setAttribute('fill', 'blue'); 
            path.setAttribute('stroke', 'blue'); 
        } else {
            path.setAttribute('fill', 'none'); 
            path.setAttribute('stroke', '#4C526A'); 
        }
    } else if (target.tagName === 'path') {
        const currentFill = target.getAttribute('fill');

        // Если fill не установлен, меняем цвет
        if (currentFill === 'none' || currentFill === '') {
            target.setAttribute('fill', 'blue'); 
            target.setAttribute('stroke', 'blue'); 
        } else {
            target.setAttribute('fill', 'none'); 
            target.setAttribute('stroke', '#4C526A');
        }
    }
}

function formatTime(value) {
    const pad = (n) => ('0' + n).slice(-2);
    const mins = Math.floor(value);
    return `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;
}

// Инициализируем слайдер когда документ загрузится
window.addEventListener('DOMContentLoaded', () => {
    const invertConnectsSlider = document.getElementById('invert-connects');
    
    noUiSlider.create(invertConnectsSlider, {
        start: [1 * 60, 2 * 60],
        step: 1,
        connect: true,
        range: {
            min: 0,
            max: 3 * 60
        },
        tooltips: true, // Включаем тултипы
        format: {
            to: formatTime,
            from: function (value) {
                return value;
            }
        }
    });

    // Переменная sliderInitialized теперь будет доступна в этой области
    window.sliderInitialized = true;
});

// Подключите обработчик событий для изменения цвета
document.addEventListener('click', function(event) {
    if (event.target.closest('svg')) { // Проверяем, если кликнули на SVG
        changeColor(event); // Вызываем функцию изменения цвета
    }
});

const playPauseButtons = document.querySelectorAll('.play-pause-button');

    playPauseButtons.forEach(button => {
        // Теперь мы ищем родительский элемент .music-player__player-song
        const audio = button.closest('.music-player__player-song').querySelector('.audio');

        if (audio) { // Дополнительная проверка на существование элемента audio
            button.onclick = function() {
                if (audio.paused) {
                    audio.play();
                    button.src = "/public/images/music-img/pause-button.svg"; // Иконка паузы
                } else {
                    audio.pause();
                    button.src = "/public/images/music-img/play-button.svg"; // Иконка воспроизведения
                }
            };
        } else {
            console.error("Audio element not found for button: ", button);
        }
    });



      