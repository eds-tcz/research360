import { fetchPlaceholders } from '../../scripts/aem.js';
function getSlidesPerView() {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 992) return 2;
  if (window.innerWidth <= 1200) return 3;
  return 4;
}

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  const slidesPerView = getSlidesPerView();

  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-slide');
  slides.forEach((aSlide, idx) => {
    const isActive = idx >= slideIndex && idx < slideIndex + slidesPerView;
    aSlide.setAttribute('aria-hidden', !isActive);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (!isActive) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    const indicatorSlideIndex = idx * slidesPerView;
    const isActive =
      slideIndex >= indicatorSlideIndex &&
      slideIndex < indicatorSlideIndex + slidesPerView;

    if (!isActive) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  const slidesPerView = getSlidesPerView();

  let realSlideIndex =
    slideIndex < 0 ? Math.max(0, slides.length - slidesPerView) : slideIndex;
  if (slideIndex >= slides.length - slidesPerView + 1) realSlideIndex = 0;

  const activeSlide = slides[realSlideIndex];

  const prevButton = block.querySelector('.slide-prev');
  const nextButton = block.querySelector('.slide-next');

  if (prevButton && nextButton) {
    prevButton.style.display = realSlideIndex === 0 ? 'none' : 'block';
    nextButton.style.display =
      realSlideIndex >= slides.length - slidesPerView ? 'none' : 'block';
  }

  activeSlide
    .querySelectorAll('a')
    .forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  if (!slideIndicators) return;

  const slides = block.querySelectorAll('.carousel-slide');
  const slidesPerView = getSlidesPerView();
  const totalGroups = Math.ceil(slides.length / slidesPerView);

  slideIndicators.innerHTML = '';

  for (let i = 0; i < totalGroups; i++) {
    const indicator = document.createElement('li');
    indicator.classList.add('carousel-slide-indicator');
    indicator.dataset.targetSlide = i * slidesPerView;
    indicator.innerHTML = `<button type="button" aria-label="Show Slide Group ${
      i + 1
    } of ${totalGroups}"></button>`;
    slideIndicators.append(indicator);
  }

  // Bind indicator clicks
  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });

  // Navigation buttons
  block.querySelector('.slide-prev').addEventListener('click', () => {
    const currentIndex = parseInt(block.dataset.activeSlide, 10);
    showSlide(block, currentIndex - slidesPerView);
  });

  block.querySelector('.slide-next').addEventListener('click', () => {
    const currentIndex = parseInt(block.dataset.activeSlide, 10);
    showSlide(block, currentIndex + slidesPerView);
  });

  // Intersection Observer for slide tracking
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) updateActiveSlide(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  slides.forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-slide');

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(
      `carousel-slide-${colIdx === 0 ? 'image' : 'content'}`
    );
    slide.append(column);
  });

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute(
    'aria-roledescription',
    placeholders.carousel || 'Carousel'
  );

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute(
      'aria-label',
      placeholders.carouselSlideControls || 'Carousel Slide Controls'
    );
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-slide-indicators');
    slideIndicatorsNav.append(slideIndicators);
    block.append(slideIndicatorsNav);

    const slideNavButtons = document.createElement('div');
    slideNavButtons.classList.add('carousel-navigation-buttons');
    slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${
        placeholders.previousSlide || 'Previous Slide'
      }"></button>
      <button type="button" class="slide-next" aria-label="${
        placeholders.nextSlide || 'Next Slide'
      }"></button>
    `;

    container.append(slideNavButtons);
  }

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button" aria-label="${
        placeholders.showSlide || 'Show Slide'
      } ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
  }
}

window.addEventListener('resize', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const activeSlideIndex = parseInt(carousel.dataset.activeSlide || 0, 10);

    bindEvents(carousel);

    showSlide(carousel, activeSlideIndex);
  });
});
