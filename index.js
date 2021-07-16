"use strict";

// initialize slide index by 1
let imageIndex = 0;
let slide_index = 0;

// toggle slide arrows to show/hide
function toggleArrows(arrowCheckBox) {
  const arrowPrev = document.querySelector(".prev");
  const arrowsNext = document.querySelector(".next");

  arrowPrev.style.display = arrowCheckBox.checked ? "block" : "none";
  arrowsNext.style.display = arrowCheckBox.checked ? "block" : "none";
}

// toggle slide bottom indicator to show/hide
function toggleDots(dotsCheckBox) {
  const dots = document.querySelector(".carousel-dots");

  dots.style.display = dotsCheckBox.checked ? "block" : "none";

  const toggleNumberIndicator = document.getElementById(
    "toggle_number_indicator"
  );

  if (!dotsCheckBox.checked) toggleNumberIndicator.checked = false;
}

// toggle add number indicator to show/hide
function toggleNumberIndicator(numberIndicatorCheckBox) {
  const allButtons = document.querySelectorAll(".carousel-dot-btn");

  if (!numberIndicatorCheckBox.checked) {
    allButtons.forEach((val) => {
      val.innerHTML = null;
    });
    return;
  }

  document.getElementById("toggle_indicator").checked = true;

  document.querySelector(".carousel-dots").style.display = "block";

  allButtons.forEach((val, i) => {
    val.innerHTML = i + 1;
  });
}

// add new slide to carousel
const addCarousel = () => {
  // adding a carousel image and text
  const carouselText = document.getElementById("carousel_label_input").value;
  const carouselImage = document.getElementById("carousel_image_input").value;

  const carousel = document.createElement("div");
  carousel.className = "carousel__item";
  carousel.innerHTML = `<img class="fade" src='${carouselImage}' alt='carousel image'> ${
    carouselText ? `<div class='carousel__text'>${carouselText}</div>` : ""
  }`;

  document.querySelector(".carousel__items").appendChild(carousel);

  // adding indicator dot to slider
  const dot = document.createElement("li");

  // check if number checkbox is ticked
  const isNumberCheckbox = document.getElementById(
    "toggle_number_indicator"
  ).checked;

  dot.className = "carousel-dot";
  dot.innerHTML = `<button class="carousel-dot-btn" onclick="navigateToImage(this)" data-slide-to="${imageIndex}">${
    isNumberCheckbox ? imageIndex + 1 : ""
  }</button>`;

  document.querySelector(".carousel-dots").appendChild(dot);

  document.getElementById("add_carousel_form").reset();

  nextSlide(1);
  imageIndex += 1;

  // reassign indexes to select menu
  getAllSlideIndexes();
};

displaySlides(slide_index);

// to go next slide_index
function nextSlide(n) {
  displaySlides((slide_index += n));
  indicatorSwitcher();
}

// to display 1 slide and hide other slides
function displaySlides(n) {
  let slides = document.getElementsByClassName("carousel__item");

  if (n > slides.length) slide_index = 1;
  if (n < 1) slide_index = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (slides.length > 0) slides[slide_index - 1].style.display = "block";
}

// to populate slides index in dropdown
const getAllSlideIndexes = () => {
  let allIds = document.querySelectorAll(".carousel__item");
  let selectComponent = document.getElementById("available-slides");

  selectComponent.innerHTML = "";

  allIds.forEach((val, index) => {
    const opt = document.createElement("option");
    opt.value = index + 1;
    opt.innerHTML = index + 1;
    document.getElementById("available-slides").appendChild(opt);
  });
};

// to remove slide and dot indicator
const removeSlideHandler = () => {
  let select = document.getElementById("available-slides");

  if (select.options[select.selectedIndex]) {
    let selectedId = select.options[select.selectedIndex].value;

    document.getElementsByClassName("carousel__item")[selectedId - 1].remove();
    document.getElementsByClassName("carousel-dot")[selectedId - 1].remove();

    const allDots = document.querySelectorAll(".carousel-dot-btn");
    allDots.forEach((button, i) => {
      button.setAttribute("data-slide-to", i);
    });

    nextSlide(-1);
    imageIndex -= 1;

    // reassign indexes to select menu
    getAllSlideIndexes();

    // to reset all button inner indicators
    toggleNumberIndicator(document.getElementById("toggle_number_indicator"));
  }
};

const toggleAutoCarousel = (autoCarouselCheckbox) => {
  if (autoCarouselCheckbox.checked) {
    setTimeout(() => {
      nextSlide(1);
      toggleAutoCarousel(autoCarouselCheckbox);
    }, 4000);
  }
};

const indicatorSwitcher = () => {
  const allDots = document.querySelectorAll(".carousel-dot-btn");
  const allCarousel = document.querySelectorAll(".carousel__item");
  let activeImage;
  allCarousel.forEach((carousel, i) => {
    if (carousel.style.display === "block") {
      activeImage = i;
    }
  });
  allDots.forEach((button) => {
    button.classList.remove("active");
    if (parseInt(button.dataset.slideTo) === activeImage) {
      button.classList.add("active");
    }
  });
};

function navigateToImage(clickedSlide) {
  let clickedButton = clickedSlide.dataset.slideTo;
  const allDots = document.querySelectorAll(".carousel-dot-btn");
  allDots.forEach((button) => {
    if (clickedButton === button.getAttribute("data-slide-to")) {
      let slides = document.querySelectorAll(".carousel__item");
      clickedButton = parseInt(clickedButton);
      slide_index = clickedButton;
      for (let i = 0; i < slides.length; i++) {
        if (clickedButton === i) {
          slides[i].style.display = "block";
        } else {
          slides[i].style.display = "none";
        }
      }
    }
  });
  indicatorSwitcher();
}

// Touch events for carousel

let touchStartX = 0;
let touchEndX = 0;

const carousel = document.getElementById("main__slider");

const handleGesture = () => {
  if (touchEndX < touchStartX) nextSlide(-1);
  if (touchEndX > touchStartX) nextSlide(1);
};

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleGesture();
});
