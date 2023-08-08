"use strict";

document.addEventListener("DOMContentLoaded", loadPage);

let aboutPrev = "";
let aboutCurr = "";
let projectCurSlide = 0;
const projectMaxSlides =
  document.querySelectorAll(".project__container").length - 1;

function loadPage() {
  addPageListeners();
}

// * * * * * EVENT LISTENERS

function addPageListeners() {
  window.addEventListener("resize", homeAnimation);

  document.querySelectorAll(".navLink").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll(".selection__li").forEach((about) => {
    about.addEventListener("click", firstAboutChoose);
  });

  // loop through slides and set each slides translateX property to index * 100%
  document.querySelectorAll(".project__container").forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  document
    .querySelector(".arrow--right")
    .addEventListener("click", changeNextProject);
  document
    .querySelector(".arrow--left")
    .addEventListener("click", changePrevProject);
  homeAnimation();
}

// * * * * * FUNCTIONS

function homeAnimation() {
  if (window.innerWidth <= 500) {
    menuListenersMobile();
    menuClassesMobile();
    pageReziseEditsMobile();
    aboutChangeMobile();
  } else {
    menuListenersDesktop();
    menuClassesDesktop();
    pageReziseEditsDesktop();
    aboutChangeDesktop();
  }
}

function menuListenersMobile() {
  document.querySelector("#menuIcon").addEventListener("click", openMobileMenu);
  document
    .querySelector("#sidebar")
    .removeEventListener("mouseover", openDesktopMenu);
}

function menuListenersDesktop() {
  document
    .querySelector("#sidebar")
    .addEventListener("mouseover", openDesktopMenu);
  document
    .querySelector("#menuIcon")
    .removeEventListener("click", openMobileMenu);
}

function menuClassesMobile() {
  document.querySelector("#home").classList.add("mobile");
}

function menuClassesDesktop() {
  document.querySelector("#home").classList.remove("mobile");
}

function pageReziseEditsMobile() {
  document.querySelector(".h1HomeBr").classList.remove("hidden");
}

function pageReziseEditsDesktop() {
  document.querySelector(".h1HomeBr").classList.add("hidden");
}

function aboutChangeMobile() {
  document.querySelectorAll(".span-arrow").forEach((arrow) => {
    arrow.classList.add("hidden");
  });
}
function aboutChangeDesktop() {
  document.querySelectorAll(".span-arrow").forEach((arrow) => {
    arrow.classList.remove("hidden");
  });
}

function closeMenu() {
  if (window.innerWidth <= 500) {
    document
      .querySelector("#menuIcon")
      .removeEventListener("click", closeMobileMenu);
    document.querySelector("#menuIcon").classList.remove("showSideBar");
    document.querySelector("#menuIcon").classList.add("hideSideBar");
    document.querySelector("#sidebar").classList.add("hideSideBar");
    document
      .querySelector("#menuIcon")
      .addEventListener("click", openMobileMenu);
  } else {
    document
      .querySelector("#sidebar")
      .removeEventListener("mouseout", closeDesktopMenu);
    document
      .querySelector("#sidebar")
      .removeEventListener("mouseover", openDesktopMenu);
    document.querySelector("#sidebar").classList.add("hideSideBar");
    document.querySelector("#sidebar").classList.add("hideSideBar");
    document
      .querySelector("#sidebar")
      .addEventListener("mouseover", waitForClose);
  }

  function waitForClose() {
    document
      .querySelector("#sidebar")
      .removeEventListener("mouseover", waitForClose);
    setTimeout(homeAnimation, 1000);
  }
}

function openMobileMenu() {
  document
    .querySelector("#menuIcon")
    .removeEventListener("click", openMobileMenu);
  document.querySelector("#sidebar").classList.remove("hideSideBar");
  document.querySelector("#menuIcon").classList.remove("hideSideBar");
  document.querySelector("#menuIcon").classList.add("showSideBar");
  document
    .querySelector("#menuIcon")
    .addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
  document
    .querySelector("#menuIcon")
    .removeEventListener("click", closeMobileMenu);
  document.querySelector("#menuIcon").classList.remove("showSideBar");
  document.querySelector("#menuIcon").classList.add("hideSideBar");
  document.querySelector("#sidebar").classList.add("hideSideBar");
  document.querySelector("#menuIcon").addEventListener("click", openMobileMenu);
}

function openDesktopMenu() {
  document
    .querySelector("#sidebar")
    .removeEventListener("mouseover", openDesktopMenu);
  document.querySelector("#sidebar").classList.remove("hideSideBar");
  document
    .querySelector("#sidebar")
    .addEventListener("mouseout", closeDesktopMenu);
}

function closeDesktopMenu() {
  document
    .querySelector("#sidebar")
    .removeEventListener("mouseout", closeDesktopMenu);
  document.querySelector("#sidebar").classList.add("hideSideBar");
  document
    .querySelector("#sidebar")
    .addEventListener("mouseover", openDesktopMenu);
}

function firstAboutChoose() {
  aboutCurr = this.id;

  document.querySelectorAll(".selection__li").forEach((about) => {
    about.removeEventListener("click", firstAboutChoose);
    about.addEventListener("click", AboutChosen);
  });

  this.classList.add("about__chosen");

  if (this.id === "aboutMe") {
    document.querySelector(".about__me__article").classList.remove("hidden");
    document.querySelector(".about__me__article").classList.add("show");
  } else if (this.id === "aboutWork") {
    document.querySelector(".about__work__article").classList.remove("hidden");
    document.querySelector(".about__work__article").classList.add("show");
  } else {
    document.querySelector(".about__fun__article").classList.remove("hidden");
    document.querySelector(".about__fun__article").classList.add("show");
  }
}

function AboutChosen() {
  aboutPrev = aboutCurr;
  aboutCurr = this.id;

  if (this.classList.contains("about__chosen")) {
  } else {
    document.querySelectorAll(".selection__li").forEach((about) => {
      about.removeEventListener("click", AboutChosen);
    });

    if (aboutPrev === "aboutMe") {
      document
        .querySelector(".about__me__article")
        .addEventListener("animationend", closeInfoBox);
      document.querySelector(".about__me__article").classList.remove("show");
    } else if (aboutPrev === "aboutWork") {
      document.querySelector(".about__work__article").classList.remove("show");
      document
        .querySelector(".about__work__article")
        .addEventListener("animationend", closeInfoBox);
    } else {
      document.querySelector(".about__fun__article").classList.remove("show");
      document
        .querySelector(".about__fun__article")
        .addEventListener("animationend", closeInfoBox);
    }

    document.querySelector(".about__chosen").classList.remove("about__chosen");
    this.classList.add("about__chosen");
  }
}

function closeInfoBox() {
  document.querySelectorAll(".selection__li").forEach((about) => {
    about.addEventListener("click", AboutChosen);
  });

  if (aboutCurr === "aboutMe") {
    document.querySelector(".about__me__article").classList.remove("hidden");
    document.querySelector(".about__work__article").classList.add("hidden");
    document.querySelector(".about__fun__article").classList.add("hidden");
    document.querySelector(".about__me__article").classList.add("show");
  } else if (aboutCurr === "aboutWork") {
    document.querySelector(".about__work__article").classList.remove("hidden");
    document.querySelector(".about__me__article").classList.add("hidden");
    document.querySelector(".about__fun__article").classList.add("hidden");
    document.querySelector(".about__work__article").classList.add("show");
  } else {
    document.querySelector(".about__fun__article").classList.remove("hidden");
    document.querySelector(".about__me__article").classList.add("hidden");
    document.querySelector(".about__work__article").classList.add("hidden");
    document.querySelector(".about__fun__article").classList.add("show");
  }
}

function changeNextProject() {
  if (projectCurSlide === projectMaxSlides) {
    projectCurSlide = 0;
  } else {
    projectCurSlide++;
  }

  document.querySelectorAll(".project__container").forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - projectCurSlide)}%)`;
  });
}
function changePrevProject() {
  if (projectCurSlide === 0) {
    projectCurSlide = projectMaxSlides;
  } else {
    projectCurSlide -= 1;
  }

  document.querySelectorAll(".project__container").forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - projectCurSlide)}%)`;
  });
}
