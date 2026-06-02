const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const welcomeModal = document.getElementById("welcomeModal");
const closeWelcome = document.getElementById("closeWelcome");
const acceptWelcome = document.getElementById("acceptWelcome");

if (!localStorage.getItem("portfolioWelcomeSeen")) {
  welcomeModal.classList.add("active");
}

function closeWelcomeModal() {
  welcomeModal.classList.remove("active");
  localStorage.setItem("portfolioWelcomeSeen", "true");
}

closeWelcome.addEventListener("click", closeWelcomeModal);
acceptWelcome.addEventListener("click", closeWelcomeModal);

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

const clickableImages = Array.from(
  document.querySelectorAll(".project-images img, .certificate-grid img")
);

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImage.src = clickableImages[currentImageIndex].src;
  lightboxImage.alt = clickableImages[currentImageIndex].alt;
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % clickableImages.length;
  lightboxImage.src = clickableImages[currentImageIndex].src;
  lightboxImage.alt = clickableImages[currentImageIndex].alt;
}

function showPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + clickableImages.length) % clickableImages.length;
  lightboxImage.src = clickableImages[currentImageIndex].src;
  lightboxImage.alt = clickableImages[currentImageIndex].alt;
}

clickableImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);
nextImage.addEventListener("click", showNextImage);
prevImage.addEventListener("click", showPrevImage);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPrevImage();
  }
});