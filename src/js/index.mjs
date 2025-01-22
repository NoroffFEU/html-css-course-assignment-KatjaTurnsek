// Toggle button Mobile

const menuBtn = document.querySelector(".toggle-btn");
const navlinks = document.querySelector(".menu-links");

menuBtn.addEventListener("click", () => {
  navlinks.classList.toggle("mobile-menu");
});

// My API Key

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2F0amFfdHVybnNlayIsImVtYWlsIjoia2F0dHVyMDE5NjJAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzczNjc4MTd9.Q_euYC06HystItf1y4r5oP_dF9WC-BUCVyvKOBG1YF0",
    "X-Noroff-API-Key": "b7062fc0-86fc-4349-b9eb-878456a8e9fc",
  },
};
