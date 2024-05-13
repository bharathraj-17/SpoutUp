// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
   // Add Swiper initialization for the home slider
   var homeSwiper = new Swiper(".home-slider", {
      loop: true,
      grabCursor: true,
      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
   });

   // Add Swiper initialization for the reviews slider
   var reviewsSwiper = new Swiper(".reviews-slider", {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      breakpoints: {
         640: {
            slidesPerView: 1
         },
         768: {
            slidesPerView: 2
         },
         991: {
            slidesPerView: 3
         },
      }
   });

   // Your existing code
   let navbar = document.querySelector('.header .navbar');
   let searchForm = document.querySelector('.header .search-form');
   let loginForm = document.querySelector('.header .login-form');
   let contactInfo = document.querySelector('.contact-info');

   document.querySelector('#menu-btn').onclick = () => {
      navbar.classList.toggle('active');
      searchForm.classList.remove('active');
      loginForm.classList.remove('active');
   };

   document.querySelector('#search-btn').onclick = () => {
      searchForm.classList.toggle('active');
      navbar.classList.remove('active');
      loginForm.classList.remove('active');
   };

   // This line was commented out to prevent conflicts with login handling
   // document.querySelector('#login-btn').onclick = () => {
   //    loginForm.classList.toggle('active');
   //    navbar.classList.remove('active');
   //    searchForm.classList.remove('active');
   // };

   document.querySelector('#info-btn').onclick = () => {
      contactInfo.classList.toggle('active');
   };

   document.querySelector('#info-btn').onclick = () => {
      contactInfo.classList.add('active');
   };

   document.querySelector('#close-contact-info').onclick = () => {
      contactInfo.classList.remove('active');
   };

   window.onscroll = () => {
      navbar.classList.remove('active');
      searchForm.classList.remove('active');
      loginForm.classList.remove('active');
      contactInfo.classList.remove('active');
   };

   var logoSwiper = new Swiper(".logo-slider", {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      breakpoints: {
         450: {
            slidesPerView: 2
         },
         640: {
            slidesPerView: 3
         },
         768: {
            slidesPerView: 4
         },
         1000: {
            slidesPerView: 5
         },
      }
   });
});
