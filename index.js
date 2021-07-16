"use strict";

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

/* Adds Element BEFORE NeighborElement */
Element.prototype.appendBefore = function (element) {
  element.parentNode.insertBefore(this, element);
};

/* Adds Element AFTER NeighborElement */
Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

const addCarousel = () => {
  const carouselText = document.getElementById("carousel_label_input").value;
  const carouselImage = document.getElementById("carousel_image_input").value;

  const carousel = document.createElement("div");
  carousel.className = "carousel__item";
  carousel.innerHTML = `<img class="fade" src='${carouselImage}' alt='carousel image'> ${
    carouselText ? `<div class='carousel__text'>${carouselText}</div>` : ""
  }`;

  // index dropdown value
  const indexValue = document.getElementById("available-slides__add").value;

  // position value before / after
  const position = document.getElementById("add__position").value;
  if (indexValue && indexValue >= 1 && position === "Before") {
    carousel.appendBefore(
      document.querySelectorAll(".carousel__item")[indexValue - 1]
    );
  } else if (indexValue && indexValue >= 1 && position === "After") {
    carousel.appendAfter(
      document.querySelectorAll(".carousel__item")[indexValue - 1]
    );
  } else {
    // append children at the end (default)
    document.querySelector(".carousel__items").appendChild(carousel);
  }

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

  // resetting the form
  document.getElementById("add_carousel_form").reset();

  nextSlide(1);
  imageIndex += 1;

  // reassign indexes to select menu with updated values
  populateDropdown();
};

displaySlides(slide_index);

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

const populateDropdown = () => {
  let allIds = document.querySelectorAll(".carousel__item");
  let selectComponent__delete = document.getElementById(
    "available-slides__delete"
  );
  let selectComponent__add = document.getElementById("available-slides__add");

  selectComponent__delete.innerHTML = "";
  selectComponent__add.innerHTML = "";

  document
    .getElementById("available-slides__add")
    .appendChild(document.createElement("option"));
  allIds.forEach((val, index) => {
    const opt_delete = document.createElement("option");
    opt_delete.value = index + 1;
    opt_delete.innerHTML = index + 1;
    document.getElementById("available-slides__delete").appendChild(opt_delete);

    const opt__add = document.createElement("option");
    opt__add.value = index + 1;
    opt__add.innerHTML = index + 1;
    document.getElementById("available-slides__add").appendChild(opt__add);
  });
};

const removeSlideHandler = () => {
  let select = document.getElementById("available-slides__delete");

  if (select.options[select.selectedIndex]) {
    let selectedId = select.options[select.selectedIndex].value;

    document.getElementsByClassName("carousel__item")[selectedId - 1].remove();
    document.getElementsByClassName("carousel-dot")[selectedId - 1].remove(); // removing dot along with slide

    // updating carousel dot data attribute after delete
    const allDots = document.querySelectorAll(".carousel-dot-btn");
    allDots.forEach((button, i) => {
      button.setAttribute("data-slide-to", i);
    });

    nextSlide(-1);

    // updating global image index after delete
    imageIndex -= 1;

    // reassign indexes to select menu
    populateDropdown();

    // to reset all button inner indicators
    toggleNumberIndicator(document.getElementById("toggle_number_indicator"));
  }
};

let id;
const toggleAutoCarousel = (autoCarouselCheckbox) => {
  clearTimeout(id);
  if (autoCarouselCheckbox.checked) {
    id = setTimeout(() => {
      nextSlide(1);
      toggleAutoCarousel(autoCarouselCheckbox);
    }, 4000);
  } else {
    clearTimeout(id);
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
  // getting which button is clicked
  let clickedButton = clickedSlide.dataset.slideTo;

  // get all bottom indicators
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

  // setting active class after navigate to image
  indicatorSwitcher();
}

// Touch events for carousel

let touchStartX = 0;
let touchEndX = 0;

const carousel = document.getElementById("main__slider");

const handleGesture = () => {
  if (touchEndX < touchStartX) nextSlide(-1); // swiped left
  if (touchEndX > touchStartX) nextSlide(1); // swiped right
};

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleGesture();
});
