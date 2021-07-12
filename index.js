function toggleArrows(arrowCheckBox) {
  let arrowPrev = document.getElementById("carousel-arrow-prev");
  let arrowsNext = document.getElementById("carousel-arrow-next");
  arrowPrev.style.display = arrowCheckBox.checked ? "block" : "none";
  arrowsNext.style.display = arrowCheckBox.checked ? "block" : "none";
}

function toggleDots(dotsCheckBox) {
  let dots = document.getElementById("dots-container");
  dots.style.display = dotsCheckBox.checked ? "block" : "none";
}
