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
  let dots = document.querySelector(".carousel-dots");
  dots.style.display = "block";
  allButtons.forEach((val, i) => {
    val.innerHTML = i + 1;
  });
}

function addCarousel() {
  document.querySelector(".carousel__container").innerHTML =
    "<img src='https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg' alt='New York City Travel Guide &amp;amp; Tips | Condé Nast Traveler'>";
}
