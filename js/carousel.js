let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let startX = 0;
let isDragging = false;

const track = document.querySelector('.carousel-track');
const cloneFirstSlides = Array.from(slides).slice(0, 4).map(slide => slide.cloneNode(true));
const cloneLastSlides = Array.from(slides).slice(-4).map(slide => slide.cloneNode(true));
cloneFirstSlides.forEach(clone => track.appendChild(clone));
cloneLastSlides.forEach(clone => track.insertBefore(clone, slides[0]));

function showSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    if (slideIndex >= totalSlides) {
        setTimeout(() => {
            track.style.transition = 'none';
            slideIndex = 0;
            showSlide(slideIndex);
        }, 500);
    }
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
    if (slideIndex < 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            slideIndex = totalSlides - 1;
            showSlide(slideIndex);
        }, 500);
    }
}

function startDrag(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
}

function endDrag(e) {
    if (!isDragging) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    if (diff > 50) {
        nextSlide();
    } else if (diff < -50) {
        prevSlide();
    }
    isDragging = false;
}

// Auto slide
setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
    track.addEventListener('mousedown', startDrag);
    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', () => (isDragging = false));
    track.addEventListener('touchstart', startDrag);
    track.addEventListener('touchend', endDrag);
});
