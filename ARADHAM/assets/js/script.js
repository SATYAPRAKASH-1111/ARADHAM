intro.style.transition = "all .775s";

onload = () => {
  AOS.init();
  setTimeout(() => {
    intro.style.scale = "1";
    intro.style.filter = "blur(0px)";
  }, 0);

  setTimeout(() => {
    intro.style.filter = "blur(25px)";
  }, 3000);

  setTimeout(() => {
    document.body.removeChild(intro);
    initializeSlides();
  }, 3250);
}

function initializeSlides() {
  const slides = document.querySelector(".slides");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const allSlides = document.querySelectorAll(".hero");
  let currentIndex = 0;

  function updateSlidePosition() {
    allSlides.forEach((slide) => slide.classList.remove("active"));
    allSlides[currentIndex].classList.add("active");
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % allSlides.length;
    updateSlidePosition();
  }

  function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
    updateSlidePosition();
  }

  let slideInterval = setInterval(moveToNextSlide, 4000);

  nextBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    moveToNextSlide();
    slideInterval = setInterval(moveToNextSlide, 4000);
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    moveToPrevSlide();
    slideInterval = setInterval(moveToNextSlide, 4000);
  })

  updateSlidePosition();
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count")

  const animateCount = (counter) => {
    const target = +counter.getAttribute("data-target")
    let count = 0
    const increment = Math.ceil(target / 200)
    const updateCount = () => {
      if (count < target) {
        count += increment
        counter.innerText = count > target ? target : count
        setTimeout(updateCount, 11)
      } else {
        counter.innerText = target
      }
    }
    updateCount()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          counter.innerText = "0"
          animateCount(counter)
        }
      })
    },
    { threshold: 0.25 }
  )

  counters.forEach((counter) => observer.observe(counter))
})

const elemToggleFunc = function (elem) { elem.classList.toggle("active") }

const navbar = document.querySelector("[data-navbar]")
const overlay = document.querySelector("[data-overlay]")
const navCloseBtn = document.querySelector("[data-nav-close-btn]")
const navOpenBtn = document.querySelector("[data-nav-open-btn]")
const navbarLinks = document.querySelectorAll("[data-nav-link]")

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]) }

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar)
    elemToggleFunc(overlay)
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const popupForm = document.getElementById("popupForm");
  const closePopupBtn = document.getElementById("closePopup");

  let popupInterval

  const showPopup = () => {
    popupForm.classList.add("active");
  };

  const hidePopup = () => {
    popupForm.classList.remove("active");

    clearInterval(popupInterval);
    startPopupInterval();
  };

  const startPopupInterval = () => {
    popupInterval = setInterval(showPopup, 10000);
  };

  startPopupInterval();

  closePopupBtn.addEventListener("click", hidePopup);

  popupForm.addEventListener("click", (event) => {
    if (event.target === popupForm) {
      hidePopup();
    }
  });
})