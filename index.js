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
}

function toggleNumberIndicator(numberIndicatorCheckBox) {
  let allButtons = document.querySelectorAll(".carousel-dot-btn");
  if (!numberIndicatorCheckBox.checked) {
    allButtons.forEach((val) => {
      val.innerHTML = null;
    });
    return;
  }
  allButtons.forEach((val, i) => {
    val.innerHTML = i + 1;
  });
}
