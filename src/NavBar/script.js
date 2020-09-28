window.onload = () => {
  const hamburger = document.querySelector(".hamburger"),
    navLink = document.querySelectorAll(".nav-link"),
    navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLink.forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    })
  );
};
