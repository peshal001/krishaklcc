document.addEventListener("DOMContentLoaded", function () {
    // Hero Slider
    var heroSlider = new Swiper(".hero-slider", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Initialize testimonials slider
    var testimonialsSwiper = new Swiper(".testimonials-swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".testimonials-swiper .swiper-pagination",
            clickable: true,
        },
        effect: 'slide',
        speed: 700,
    });

    const featuredProductGrid = document.getElementById("featured-product-grid");
    const featuredKitchenProductGrid = document.getElementById("featured-kitchen-product-grid");
    const homeKitchenProductGrid = document.getElementById(
        "home-kitchen-product-grid"
    );
    const productGrid = document.getElementById("product-grid");
    const productsPage = document.querySelector(".products-page");
    const categoryTabs = document.getElementById("category-tabs");

    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('header .nav-list a');

        navLinks.forEach(link => {
            const linkPage = new URL(link.href).pathname.split('/').pop() || 'index.html';
            link.classList.remove('active');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    };

    const loadFooter = () => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            fetch('footer.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    footerPlaceholder.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error loading footer:', error);
                    footerPlaceholder.innerHTML = '<p style="text-align:center; color:red;">Error loading footer content.</p>';
                });
        }
    };

    // Initial calls
    setActiveLink();
    fetchProducts();

    function fetchProducts() {
        fetch('data/products.json')
            .then(response => response.json())
            .then(data => {
                if (featuredProductGrid) {
                    // Show 8 beauty products
                    const beautyProducts = data.filter(p => p.category === 'Beauty Care');
                    displayProducts(beautyProducts.slice(0, 8), featuredProductGrid);
                }
                if (featuredKitchenProductGrid) {
                    // Show 4 kitchen products
                    const kitchenProducts = data.filter(p => p.category === 'Home And Kitchen');
                    displayProducts(kitchenProducts.slice(0, 4), featuredKitchenProductGrid);
                }
            });
    }

    function displayProducts(products, gridElement) {
        if (!gridElement) return;
        gridElement.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="https://wa.me/16164827086?text=${encodeURIComponent(`I'm interested in: ${product.name}`)}" class="btn add-to-cart-btn" target="_blank">Query on WhatsApp</a>
                </div>
            </div>
        `).join('');
    }

    // Responsive mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
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

    // === Homepage Animations ===
    const animatedElements = document.querySelectorAll('.animated');
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animate || 'animate-fadeIn';
                    el.classList.add(animation);
                    el.classList.remove('animated');
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.15 });
        animatedElements.forEach((el, i) => {
            // Add staggered delay if not already set
            if (!el.classList.contains('delay-1') && !el.classList.contains('delay-2') && !el.classList.contains('delay-3') && !el.classList.contains('delay-4') && !el.classList.contains('delay-5')) {
                el.classList.add('delay-' + ((i % 5) + 1));
            }
            observer.observe(el);
        });
    }
});

// Need to add product card styles to style.css

const productCardStyles = `
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.product-image {
  position: relative;
}

.product-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.wishlist-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wishlist-btn:hover {
    background: var(--primary-color);
    color: #fff;
}
.wishlist-btn:hover svg {
    stroke: #fff;
}

.product-info {
  padding: 20px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 10px;
  min-height: 40px;
}

.product-price {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.add-to-cart-btn {
  padding: 10px 20px;
  font-size: 0.9em;
}
`;
// I will add these styles to css/style.css
