"use strict";

function toggleArrows(arrowCheckBox) {
  let arrowPrev = document.querySelector(".prev");
  let arrowsNext = document.querySelector(".next");
  arrowPrev.style.display = arrowCheckBox.checked ? "block" : "none";
  arrowsNext.style.display = arrowCheckBox.checked ? "block" : "none";
}

function toggleDots(dotsCheckBox) {
  let dots = document.querySelector(".carousel-dots");
  dots.style.display = dotsCheckBox.checked ? "block" : "none";
  let toggleNumberIndicator = document.getElementById(
    "toggle_number_indicator"
  );
  if (!dotsCheckBox.checked) {
    toggleNumberIndicator.checked = false;
  }
}

function toggleNumberIndicator(numberIndicatorCheckBox) {
  let allButtons = document.querySelectorAll(".carousel-dot-btn");
  if (!numberIndicatorCheckBox.checked) {
    allButtons.forEach((val) => {
      val.innerHTML = null;
    });
    return;
  }
  document.getElementById("toggle_indicator").checked = true;
  let dots = document.querySelector(".carousel-dots");
  dots.style.display = "block";
  allButtons.forEach((val, i) => {
    val.innerHTML = i + 1;
  });
}

function addCarousel() {
  let carouselText = document.getElementById("carousel_label_input").value;
  let carouselImage = document.getElementById("carousel_image_input").value;
  console.log(carouselImage);
  const div = document.createElement("div");
  div.innerHTML = `<div class="carousel__item"><img src='${carouselImage}' alt='carousel image'> ${
    carouselText
      ? `<div class='carousel__text'>${carouselText}</div></div>`
      : "</div>"
  }`;
  document.querySelector(".carousel__items").appendChild(div);
  document.getElementById("add_carousel_form").reset();
}
