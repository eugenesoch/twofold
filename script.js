document.addEventListener("DOMContentLoaded", function () {
    // Initialize GSAP and Observer
    gsap.registerPlugin(Observer, ScrollTrigger);
  
    // Initialize Scroll Animations
    initScrollAnimations();
  
    // Initialize Section Scrolling (only on large viewports)
    if (window.innerWidth > 991) {
      initSectionScroll();
    }
  
    // Initialize Swipers
    initSwipers();
  
    // Add Resize Listener to Toggle Section Scrolling on Resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991 && !Observer.getAll().length) {
        initSectionScroll();
      } else if (window.innerWidth <= 991) {
        Observer.getAll().forEach((obs) => obs.kill()); // Disable scrolling feature for small screens
      }
    });
  });
  
  // Function to initialize Scroll Animations
  function initScrollAnimations() {
    gsap.to(".hero-logo", {
      scrollTrigger: {
        trigger: "#story",
        toggleActions: "play none none reverse",
        markers: true,
      },
      marginTop: "5vh",
      height: "10vh",
      ease: "power2.inOut",
      duration: 0.75,
    });
  }
  
  // Function to handle scrolling between sections
  function initSectionScroll() {
    const sections = document.querySelectorAll("section"); // Use your Webflow class for sections
    let currentIndex = 0;
  
    function scrollToSection(index) {
      gsap.to(window, {
        scrollTo: { y: sections[index], autoKill: false },
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          currentIndex = index;
        },
      });
    }
  
    Observer.create({
      target: window,
      type: "wheel,touch",
      onUp: () => {
        if (currentIndex > 0) {
          scrollToSection(currentIndex - 1);
        }
      },
      onDown: () => {
        if (currentIndex < sections.length - 1) {
          scrollToSection(currentIndex + 1);
        }
      },
      wheelSpeed: 1,
      tolerance: 10,
      preventDefault: true,
    });
  }
  
  // Function to initialize the Swipers
  function initSwipers() {
    // Gallery Swiper
    var gallerySwiper = new Swiper(".swiper.is-cocktail", {
      slidesPerView: 1,
      spaceBetween: 96,
      mousewheel: true,
      breakpoints: {
        991: {
          slidesPerView: 2,
          spaceBetween: 96,
        },
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  
    // Modal Swiper
    var modalSwiper = new Swiper(".swiper.is-modal", {
      slidesPerView: 1,
      spaceBetween: 10,
      mousewheel: true,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-mod",
        prevEl: ".swiper-button-prev-mod",
      },
    });
  
    // Add event listeners for gallery slide clicks
    gallerySwiper.slides.forEach((slide, index) => {
      slide.addEventListener("click", function () {
        openModal(index, modalSwiper);
      });
    });
  
    // Close Modal Event
    document
      .querySelector('[data-w-id="26abd567-d285-b686-5459-8d59e733768f"]')
      .addEventListener("click", closeModal);
  }
  
  // Function to open the modal
  function openModal(slideIndex, modalSwiper) {
    // Pause all GSAP ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
  
    // Disable page scroll
    document.body.style.overflow = "hidden";
  
    // Display modal and navigate to the correct slide
    document.querySelector(".modal-outer-wrapper").style.display = "block";
    modalSwiper.slideTo(slideIndex, 0);
  }
  
  // Function to close the modal
  function closeModal() {
    // Resume all GSAP ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
  
    // Enable page scroll
    document.body.style.overflow = "auto";
  
    // Hide modal
    document.querySelector(".modal-outer-wrapper").style.display = "none";
  }
  