/**
 * Main JavaScript file for Matheesha Craft Store
 * Contains interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive elements
  initCustomCursor();
  initMobileMenu();
  initHeroAnimation();
  initProductsGrid();
  initBackToTop();
  initTestimonialSlider();
  initContactForm();
  initProductFilters();
  initScrollAnimations();
  
  // Initialize feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
});

/**
 * Custom cursor implementation
 */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  
  if (!cursor || window.matchMedia('(max-width: 768px)').matches) {
    // Don't use custom cursor on mobile/touch devices
    document.querySelector('.custom-cursor')?.remove();
    return;
  }
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Add hover effect when over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .product-card, .feature-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const closeButton = document.getElementById('close-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });
  
  closeButton.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  // Close mobile menu when a link is clicked
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Hero section animation
 */
function initHeroAnimation() {
  const hero = document.getElementById('hero');
  
  if (hero) {
    setTimeout(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }, 300);
  }
}

/**
 * Initialize products grid with items
 */
function initProductsGrid() {
  const productsGrid = document.getElementById('products-grid');
  
  if (!productsGrid) return;
  
  // Products data
  const products = [
    { 
      name: "Traditional Clay Pot", 
      price: "Rs. 1,250", 
      description: "Hand-crafted from local clay with traditional patterns",
      category: "pottery"
    },
    { 
      name: "Wooden Elephant Carving", 
      price: "Rs. 3,500", 
      description: "Intricately carved teak elephant figure",
      category: "woodwork"
    },
    { 
      name: "Beaded Necklace Set", 
      price: "Rs. 1,890", 
      description: "Handmade with colorful glass beads and silver accents",
      category: "jewelry"
    },
    { 
      name: "Handloom Table Runner", 
      price: "Rs. 2,450", 
      description: "Cotton table runner with traditional Sri Lankan patterns",
      category: "textiles"
    },
    { 
      name: "Terracotta Oil Lamp", 
      price: "Rs. 890", 
      description: "Traditional oil lamp for festivals and home decoration",
      category: "pottery"
    },
    { 
      name: "Coconut Shell Craft Box", 
      price: "Rs. 1,750", 
      description: "Beautiful utility box made from polished coconut shell",
      category: "woodwork"
    }
  ];
  
  // Generate HTML for each product
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = `product-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 data-category-${product.category}`;
    
    productCard.innerHTML = `
      <div class="image-container h-48 bg-amber-50 flex items-center justify-center">
        <div class="text-craft-amber">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
          <span class="text-sm italic">${product.category}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-craft-brown mb-1">${product.name}</h3>
        <p class="text-gray-600 text-sm mb-3">${product.description}</p>
        <div class="flex justify-between items-center">
          <span class="font-bold text-craft-terracotta">${product.price}</span>
          <a href="https://wa.link/u2oa3j" target="_blank" class="bg-craft-amber hover:bg-craft-terracotta text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Buy Now
          </a>
        </div>
      </div>
    `;
    
    productsGrid.appendChild(productCard);
  });
}

/**
 * Product category filtering
 */
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('bg-craft-amber');
        btn.classList.remove('text-white');
        btn.classList.add('bg-white');
        btn.classList.add('text-craft-brown');
        btn.classList.add('border');
        btn.classList.add('border-craft-amber');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      button.classList.add('bg-craft-amber');
      button.classList.add('text-white');
      button.classList.remove('bg-white');
      button.classList.remove('text-craft-brown');
      button.classList.remove('border');
      button.classList.remove('border-craft-amber');
      
      const filter = button.getAttribute('data-filter');
      
      // Show all products or filter by category
      productCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          if (card.classList.contains(`data-category-${filter}`)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider .flex');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  // Check if elements exist before initializing
  if (!slider || !slides.length || !prevButton || !nextButton || !dots.length) {
    console.warn('Testimonial slider elements not found');
    return;
  }
  
  let currentSlide = 0;
  let slideWidth = 100; // Percentage width
  
  // Update slide width based on viewport
  function updateSlideWidth() {
    if (window.innerWidth >= 1024) {
      slideWidth = 33.33; // 3 slides per view on large screens
    } else if (window.innerWidth >= 768) {
      slideWidth = 50; // 2 slides per view on medium screens
    } else {
      slideWidth = 100; // 1 slide per view on small screens
    }
    
    // Update the transform
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  }
  
  // Initialize slider
  updateSlideWidth();
  window.addEventListener('resize', updateSlideWidth);
  
  // Update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('bg-craft-amber');
        dot.classList.remove('bg-gray-300');
      } else {
        dot.classList.remove('bg-craft-amber');
        dot.classList.add('bg-gray-300');
      }
    });
  }
  
  // Make sure dots initial state is correct
  updateDots();
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    updateDots();
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    updateDots();
  }
  
  // Event listeners
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  
  // Click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
      updateDots();
    });
  });
  
  // Auto slide every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    let errorMessage = '';
    
    if (!name.trim()) {
      isValid = false;
      errorMessage += 'Please enter your name.\n';
    }
    
    if (!email.trim()) {
      isValid = false;
      errorMessage += 'Please enter your email.\n';
    } else if (!isValidEmail(email)) {
      isValid = false;
      errorMessage += 'Please enter a valid email address.\n';
    }
    
    if (!message.trim()) {
      isValid = false;
      errorMessage += 'Please enter your message.\n';
    }
    
    if (isValid) {
      // Here you would typically send the form data to a server
      // For this demo, just show a success message
      const formElements = contactForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== 'submit') {
          formElements[i].value = '';
        }
      }
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
    } else {
      alert(errorMessage);
    }
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

/**
 * Scroll animations for elements
 */
function initScrollAnimations() {
  // Select all elements to animate
  const animateElements = document.querySelectorAll('.feature-card, .product-card, .process-step');
  
  // Intersection Observer options
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe each element
  animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
  
  // Add animation classes when elements come into view
  document.addEventListener('scroll', function() {
    animateElements.forEach(element => {
      if (isElementInViewport(element) && element.style.opacity === '0') {
        element.style.opacity = '1';
        element.classList.add('transition-all', 'duration-500', 'transform', 'translate-y-0');
        element.classList.remove('opacity-0', 'translate-y-4');
      }
    });
  });
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
