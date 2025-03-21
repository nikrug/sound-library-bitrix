import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
const swiper = new Swiper('.swiper', {
    modules: [Pagination, Navigation],
    loop: true, // Зацикливание слайдов
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1244: {
            slidesPerView: 3, // 2 слайда на планшете
      
            slidesPerGroup: 3,
        },
        // Когда окно равно 768px и выше
        768: {
            slidesPerView: 2, // 2 слайда на планшете
          
            slidesPerGroup: 1,
        },
        // Когда окно меньше 768px
        320: {
            slidesPerView: 1, // 1 слайд на мобильных устройствах
        
            slidesPerGroup: 1,
        },
    },
...Pagination
});
swiper.update();
});

// OR (Alternative)
swiper.update();
swiper.nextEl = '.swiper-button-next';
swiper.prevEl = '.swiper-button-prev';