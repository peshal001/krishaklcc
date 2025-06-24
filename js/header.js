console.log("Header.js loaded");

const headerPlaceHolder = document.getElementById("header-placeholder");
console.log("Header placeholder element:", headerPlaceHolder);

if (headerPlaceHolder) {
  console.log("Fetching header.html...");
  fetch("./header.html")
    .then((response) => {
      console.log("Header response status:", response.status);
      return response.text();
    })
    .then((html) => {
      console.log("Header HTML loaded, length:", html.length);
      console.log("Header HTML content:", html);
      headerPlaceHolder.innerHTML = html;
      console.log("Header content inserted");
      
      // Check if main-nav exists after insertion
      const mainNav = headerPlaceHolder.querySelector('.main-nav');
      console.log("Main nav element after insertion:", mainNav);
      
      // Check if main-header exists after insertion
      const mainHeader = headerPlaceHolder.querySelector('.main-header');
      console.log("Main header element after insertion:", mainHeader);
      
      // Check all elements in the header
      const allElements = headerPlaceHolder.querySelectorAll('*');
      console.log("All elements in header:", allElements.length);
      allElements.forEach((el, index) => {
        console.log(`Element ${index}:`, el.tagName, el.className);
      });
      
      // Responsive mobile menu toggle
      const mobileMenuBtn = headerPlaceHolder.querySelector('#mobile-menu');
      if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
          mainNav.classList.toggle('active');
          if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        });
      }
      // Dropdown toggle for mobile
      const dropdownToggles = headerPlaceHolder.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            const parent = toggle.closest('.dropdown');
            if (parent) {
              parent.classList.toggle('open');
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });
} else {
  console.error("Header placeholder element not found");
}
