function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function initCarousels() {
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        const slides = carousel.querySelector('.carousel-slides');
        const images = slides.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        let currentSlide = 0;
        
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        function updateDots() {
            dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(index) {
            currentSlide = index;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            goToSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % images.length;
            goToSlide(currentSlide);
        });

        let touchStartX = 0;
        let touchEndX = 0;

        slides.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slides.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    currentSlide = (currentSlide + 1) % images.length;
                } else {
                    currentSlide = (currentSlide - 1 + images.length) % images.length;
                }
                goToSlide(currentSlide);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initCarousels);