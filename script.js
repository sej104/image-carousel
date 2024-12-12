const setActiveButton = (index) => {
  const activeNavigationButton = document.querySelector("#active");
  activeNavigationButton.id = "";
  const navigationButton = document.querySelector(`[data-index='${index}']`);
  navigationButton.id = "active";
};

const images = document.querySelectorAll(".container div");
const lastImagePositionValue = (images.length - 1) * 800;

const displayPreviousImage = () => {
  images.forEach((image) => {
    const positionValue = parseInt(image.style.right, 10) - 800;

    if (Number.isNaN(positionValue) || positionValue < 0) {
      image.style.right = `${lastImagePositionValue}px`;
    } else {
      image.style.right = `${positionValue}px`;
    }
  });

  const navigationIndex = parseInt(images[0].style.right, 10) / 800;
  setActiveButton(navigationIndex);
};

const displayNextImage = () => {
  images.forEach((image) => {
    const positionValue = parseInt(image.style.right, 10) + 800;

    if (Number.isNaN(positionValue)) {
      image.style.right = "800px";
    } else if (positionValue > lastImagePositionValue) {
      image.style.right = "0px";
    } else {
      image.style.right = `${positionValue}px`;
    }
  });

  const navigationIndex = parseInt(images[0].style.right, 10) / 800;
  setActiveButton(navigationIndex);
};

const selectImage = (e) => {
  const navigationButton = e.target.closest("button");
  if (!navigationButton) return;

  const index = navigationButton.dataset.index;
  setActiveButton(index);

  images.forEach((image) => {
    image.style.right = `${index * 800}px`;
  });
};

let slideShow = setInterval(displayNextImage, 5000);

const resetSlideShow = () => {
  clearInterval(slideShow);
  slideShow = setInterval(displayNextImage, 5000);
};

const leftChevron = document.querySelector("#left-chevron");
leftChevron.addEventListener("click", () => {
  resetSlideShow();
  displayPreviousImage();
});

const rightChevron = document.querySelector("#right-chevron");
rightChevron.addEventListener("click", () => {
  resetSlideShow();
  displayNextImage();
});

const navigationContainer = document.querySelector(".navigation");
navigationContainer.addEventListener("click", (e) => {
  resetSlideShow();
  selectImage(e);
});
