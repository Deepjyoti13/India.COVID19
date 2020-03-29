const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body");
const icon = document.querySelector(".icon_mob");
const navLinks = document.querySelector(".mob-nav-links");
const links = document.querySelectorAll(".mob-nav-links li");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("fix");
  icon.classList.toggle("disappear");
  body.classList.toggle("halt");
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});