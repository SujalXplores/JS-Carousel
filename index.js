"use strict";

let imageIndex = 1;

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
  if (!dotsCheckBox.checked) {
    toggleNumberIndicator.checked = false;
  }
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
  const dots = document.querySelector(".carousel-dots");
  dots.style.display = "block";
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
  carousel.className = "carousel__item fade";
  carousel.id = `item__${imageIndex}`;
  carousel.innerHTML = `<img src='${carouselImage}' alt='carousel image'> ${
    carouselText ? `<div class='carousel__text'>${carouselText}</div>` : ""
  }`;
  document.querySelector(".carousel__items").appendChild(carousel);

  // adding indicator dot to slider
  const dot = document.createElement("li");
  dot.className = "carousel-dot";
  dot.innerHTML = '<button class="carousel-dot-btn"></button>';
  document.querySelector(".carousel-dots").appendChild(dot);
  document.getElementById("add_carousel_form").reset();
  nextSlide(1);
  imageIndex += 1;
};

// initialize slide index by 1
let slide_index = 1;
displaySlides(slide_index);

// to go next slide_index
function nextSlide(n) {
  displaySlides((slide_index += n));
}

// to display 1 slide and hide other slides
function displaySlides(n) {
  let slides = document.getElementsByClassName("carousel__item");
  if (n > slides.length) {
    slide_index = 1;
  }
  if (n < 1) {
    slide_index = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0) {
    slides[slide_index - 1].style.display = "block";
  }
}

// to get all slides index in dropdown

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

const removeSlideHandler = () => {
  let select = document.getElementById("available-slides");
  let selectedId = select.options[select.selectedIndex].value;
  console.log(selectedId);
  // document.getElementById(`item__${selectedId}`).remove();
};
