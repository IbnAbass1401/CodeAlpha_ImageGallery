
const images = [
  {
    title: "Mountain Lake",
    category: "Nature",
    src: "images/mountain-lake.jpg"
  },
  {
    title: "Forest Path",
    category: "Nature",
    src: "images/forest-path.jpg"
  },
  {
    title: "Misty Peaks",
    category: "Nature",
    src: "images/misty-peaks.jpg"
  },
  {
    title: "Golden Valley",
    category: "Nature",
    src: "images/golden-valley.jpg"
  },
  {
    title: "Skyline at Dusk",
    category: "City",
    src: "images/skyline-at-dusk.jpg"
  },
  {
    title: "Downtown Lights",
    category: "City",
    src: "images/downtown-lights.jpg"
  },
  {
    title: "Neon Streets",
    category: "City",
    src: "images/neon-streets.jpg"
  },
  {
    title: "Urban Bridge",
    category: "City",
    src: "images/urban-bridge.jpg"
  },
  {
    title: "Milky Way",
    category: "Space",
    src: "images/milky-way.jpg"
  },
  {
    title: "Deep Nebula",
    category: "Space",
    src: "images/deep-nebula.jpg"
  },
  {
    title: "Starry Peaks",
    category: "Space",
    src: "images/starry-peaks.jpg"
  },
  {
    title: "Beach",
    category: "Ocean",
    src: "images/beach.jpg"
  },
  {
    title: "Underwater Reef",
    category: "Ocean",
    src: "images/underwater-light.jpg"
  },
  {
    title: "Dark Ocean",
    category: "Ocean",
    src: "images/dark-water.jpg"
  },
  {
    title: "Underwater Life",
    category: "Ocean",
    src: "images/underwater-organisms.jpg"
  }
];

// Get the HTML elements we need.
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const count = document.getElementById("count");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lb-img");
const lightboxTitle = document.getElementById("lb-title");
const lightboxMeta = document.getElementById("lb-meta");

const closeButton = document.getElementById("close");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("prev");

// Keep track of the current gallery state.
let activeCategory = "All";
let visibleImages = images;
let currentIndex = 0;
let lastFocusedElement = null;

// Display the gallery images.
function displayImages() {
  // Get the images that match the selected category.
  visibleImages = images.filter(function (image) {
    return activeCategory === "All" ||
      image.category === activeCategory;
  });

  // Clear the old gallery cards.
  grid.innerHTML = "";

  // Create a card for each image.
  visibleImages.forEach(function (image, index) {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;

    // Keep the original animation and its staggered timing.
    card.style.animationDelay = index * 60 + "ms";

    const picture = document.createElement("img");
    picture.src = image.src;
    picture.alt = image.title;
    picture.loading = "lazy";

    // Show a message if an image file cannot be loaded.
    picture.addEventListener("error", function () {
      picture.alt = image.title + " — image could not be loaded";
      picture.classList.add("image-error");
    }, { once: true });

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const category = document.createElement("span");
    category.textContent = image.category;

    const title = document.createElement("h3");
    title.textContent = image.title;

    overlay.appendChild(category);
    overlay.appendChild(title);

    card.appendChild(picture);
    card.appendChild(overlay);

    // Open the image when the card is clicked.
    card.addEventListener("click", function () {
      openLightbox(index);
    });

    // Allow keyboard users to open a card.
    card.addEventListener("keydown", function (event) {
      if (
        event.target === card &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(card);
  });

  // Update the image count.
  count.textContent =
    "Showing " + visibleImages.length +
    " image" + (visibleImages.length === 1 ? "" : "s") +
    " · " + activeCategory;
}

// Create the category filter buttons.
function displayFilters() {
  const categories = ["All"];

  images.forEach(function (image) {
    if (!categories.includes(image.category)) {
      categories.push(image.category);
    }
  });

  filters.innerHTML = "";

  categories.forEach(function (categoryName) {
    const button = document.createElement("button");
    button.textContent = categoryName;

    if (categoryName === activeCategory) {
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }

    button.addEventListener("click", function () {
      activeCategory = categoryName;

      displayFilters();
      displayImages();
    });

    filters.appendChild(button);
  });
}

// Display one image inside the lightbox.
function showImage(index) {
  if (visibleImages.length === 0) {
    return;
  }

  // Wrap around when we reach either end of the gallery.
  currentIndex =
    (index + visibleImages.length) % visibleImages.length;

  const image = visibleImages[currentIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.title;

  lightboxTitle.textContent = image.title;

  lightboxMeta.textContent =
    image.category + " · " +
    (currentIndex + 1) + " / " + visibleImages.length;

  // Update navigation button labels.
  previousButton.setAttribute(
    "aria-label",
    "Previous image: " +
      visibleImages[
        (currentIndex - 1 + visibleImages.length) %
        visibleImages.length
      ].title
  );

  nextButton.setAttribute(
    "aria-label",
    "Next image: " +
      visibleImages[
        (currentIndex + 1) % visibleImages.length
      ].title
  );
}

// Open the lightbox.
function openLightbox(index) {
  lastFocusedElement = document.activeElement;

  showImage(index);

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeButton.focus();
}

// Close the lightbox.
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  // Return keyboard focus to the previously selected card.
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Move to the next image.
function showNextImage() {
  showImage(currentIndex + 1);
}

// Move to the previous image.
function showPreviousImage() {
  showImage(currentIndex - 1);
}

// Connect the navigation buttons.
nextButton.addEventListener("click", showNextImage);
previousButton.addEventListener("click", showPreviousImage);
closeButton.addEventListener("click", closeLightbox);

// Close the lightbox when the dark background is clicked.
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Support keyboard navigation.
document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  } else if (event.key === "ArrowLeft") {
    showPreviousImage();
  } else if (event.key === "Escape") {
    closeLightbox();
  }
});

// Support swiping on mobile devices.
let touchStartX = 0;

lightbox.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", function (event) {
  const touchEndX = event.changedTouches[0].clientX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) > 50) {
    if (distance < 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  }
}, { passive: true });

// Start the gallery.
displayFilters();
displayImages();
