// UTM hidden fields mapping
const utmFields = {
    utm_source: "form-field-utm_source",
    utm_medium: "form-field-utm_medium",
    utm_campaign: "form-field-utm_campaign",
    utm_term: "form-field-utm_term",
    utm_device: "form-field-utm_device",
    utm_adset: "form-field-utm_adset",
    utm_content: "form-field-utm_content",
    utm_adgroup: "form-field-utm_adgroup"
};

// Fill hidden UTM inputs from URL params
const urlParams = new URLSearchParams(window.location.search);
for (const key in utmFields) {
    const el = document.getElementById(utmFields[key]);
    if (el && urlParams.has(key)) {
        el.value = urlParams.get(key);
    }
}

document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "leadForm") {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("formName", "reef998_leadForm");

        fetch("https://hooks.zapier.com/hooks/catch/20217603/2pr1lap/", {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    window.location.href = "https://reefdevelopments.ae/en/Thank-you.html";
                    e.target.reset();
                    const modal = document.getElementById("formModal");
                    if (modal) modal.style.display = "none";
                } else alert("❌ Submission failed");
            })
            .catch(() => alert("❌ Network error"));
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById('openForm');
    const modal = document.getElementById('formModal');
    
    if (!openBtn || !modal) return; // Exit if elements don't exist
    
    const closeBtn = modal.querySelector('.close');
    if (!closeBtn) return; // Exit if close button doesn't exist

    // Open popup
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById('openForm_1');
    const modal = document.getElementById('formModal_1');
    
    if (!openBtn || !modal) return; // Exit if elements don't exist
    
    const closeBtn = modal.querySelector('.close');
    if (!closeBtn) return; // Exit if close button doesn't exist

    // Open popup
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});



// Handle tabs
const tabs = document.querySelectorAll('.tab');
const sliders = document.querySelectorAll('.slider');

if (tabs.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            sliders.forEach(slider => slider.classList.remove('active'));
            const targetSlider = document.getElementById(tab.dataset.slider);
            if (targetSlider) {
                targetSlider.classList.add('active');
            }
        });
    });
}

// Handle slider controls
document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const counter = slider.querySelector('.counter');
    let index = 0;

    if (slides.length === 0 || !counter) return; // Exit if no slides or counter

    function updateSlider() {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        counter.textContent = `${index + 1} / ${slides.length}`;
    }

    if (prev) {
        prev.addEventListener('click', () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

    if (next) {
        next.addEventListener('click', () => {
            index = (index + 1) % slides.length;
            updateSlider();
        });
    }

    updateSlider(); // Initialize
});


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".amenities-slider");
    if (!slider) return; // exit if the slider doesn't exist

    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".amenities-prev");
    const nextBtn = slider.querySelector(".amenities-next");
    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[i].classList.add("active");
    }

    showSlide(index);

    prevBtn?.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    nextBtn?.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Loop through all sliders
    document.querySelectorAll(".slider").forEach(slider => {
        const slides = slider.querySelectorAll(".slide");
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");
        let index = 0;

        function showSlide(i) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[i].classList.add("active");
        }

        // Show first slide for each slider
        showSlide(index);

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + slides.length) % slides.length;
                showSlide(index);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % slides.length;
                showSlide(index);
            });
        }
    });
});


const select = document.getElementById("country_code");

if (select) {
    select.addEventListener("change", function () {
        const option = this.options[this.selectedIndex];
        const flag = option.getAttribute("data-flag");
        const code = option.getAttribute("data-code");

        // Change the text permanently (so works on mobile too)
        option.textContent = `${flag} ${code}`;
    });
}

let currentUnit = '1bhk';
let currentSlideIndex = 0;

// Unit selection functionality
document.querySelectorAll('.unit-option').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.unit-option').forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Hide all gallery images
        document.querySelectorAll('.gallery-images').forEach(gallery => gallery.classList.remove('active'));

        // Show selected unit images
        currentUnit = this.dataset.unit;
        const targetGallery = document.getElementById(currentUnit + '-images');
        targetGallery.classList.add('active');

        // Reset to first slide
        currentSlideIndex = 0;
        updateSlides();
        updateNavDots();
    });
});

// Slide navigation functionality
function updateSlides() {
    const activeGallery = document.querySelector('.gallery-images.active');
    if (!activeGallery) return;
    
    const slides = activeGallery.querySelectorAll('.image-slide');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });
}

function updateNavDots() {
    const activeGallery = document.querySelector('.gallery-images.active');
    if (!activeGallery) return;
    
    const slides = activeGallery.querySelectorAll('.image-slide');
    const navContainer = document.getElementById('gallery-nav');
    if (!navContainer) return;

    // Clear existing dots
    navContainer.innerHTML = '';

    // Create new dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `nav-dot ${index === currentSlideIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlides();
            updateNavDots();
        });
        navContainer.appendChild(dot);
    });
}

function changeSlide(direction) {
    const activeGallery = document.querySelector('.gallery-images.active');
    if (!activeGallery) return;
    
    const slides = activeGallery.querySelectorAll('.image-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;

    currentSlideIndex += direction;

    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }

    updateSlides();
    updateNavDots();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Initialize navigation dots for 1BHK (default)
    updateNavDots();
});

// Touch/swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

const imageGallery = document.querySelector('.image-gallery');
if (imageGallery) {
    imageGallery.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    imageGallery.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left - next slide
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right - previous slide
    }
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});