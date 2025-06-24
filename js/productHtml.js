document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    const featuredProductGrid = document.getElementById('featured-product-grid');
    const productGrid = document.getElementById('product-grid');
    const productsPageContent = document.querySelector('.products-page-content');
    const categoryTabs = document.getElementById('category-tabs');
    const paginationContainer = document.getElementById('pagination-container');

    let allProducts = [];
    let currentPage = 1;
    const productsPerPage = 8;

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

    const setActiveTab = () => {
        if (!categoryTabs) return;

        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');
        const tabLinks = categoryTabs.querySelectorAll('.tab-link');

        tabLinks.forEach(link => {
            link.classList.remove('active');
            const linkCategory = new URL(link.href).searchParams.get('category');

            if (linkCategory === currentCategory) {
                link.classList.add('active');
            }
        });

        // If no category in URL, "All" tab is active.
        if (!currentCategory) {
            categoryTabs.querySelector('a[href="products.html"]').classList.add('active');
        }
    };

    const fetchProducts = () => {
        fetch("data/products.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                allProducts = data;

                console.log('Products loaded:', data.length); // Debug log

                if (featuredProductGrid) {
                    const beautyProducts = data.filter(
                        (p) => p.category === "Beauty"
                    );
                    displayProducts(beautyProducts.slice(0, 4), featuredProductGrid);
                }

                if (productsPageContent && productGrid) {
                    setActiveTab();
                    const urlParams = new URLSearchParams(window.location.search);
                    const category = urlParams.get('category');

                    let productsToDisplay = allProducts;

                    if (category) {
                        const decodedCategory = decodeURIComponent(category).replace(/\+/g, ' ');
                        console.log('Filtering by category:', decodedCategory); // Debug log
                        productsToDisplay = allProducts.filter(p => p.category === decodedCategory);
                        console.log('Filtered products:', productsToDisplay.length); // Debug log
                    }

                    renderProductsPage(productsToDisplay);
                }
            })
            .catch((error) => {
                console.error("Could not fetch products: ", error);
            });
    };

    const renderProductsPage = (products) => {
        const pageTitle = document.querySelector('.page-header h1');
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (category) {
            pageTitle.textContent = decodeURIComponent(category).replace(/\+/g, ' ');
        } else {
            pageTitle.textContent = "Our Products";
        }

        displayPaginatedProducts(products, productGrid, currentPage);
        setupPagination(products, paginationContainer);
    }

    const displayPaginatedProducts = (products, gridElement, page) => {
        if (!gridElement) return;

        gridElement.innerHTML = "";
        page--; // Because slice is zero-indexed

        const start = productsPerPage * page;
        const end = start + productsPerPage;
        const paginatedItems = products.slice(start, end);

        if (paginatedItems.length === 0) {
            gridElement.innerHTML = "<p>No products found in this category.</p>";
            return;
        }

        const productCards = paginatedItems.map(
            (product) => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="https://wa.me/16164827086?text=${encodeURIComponent(`I'm interested in: ${product.name}`)}" class="btn add-to-cart-btn" target="_blank">Query on WhatsApp</a>
                </div>
            </div>`
        ).join("");

        gridElement.innerHTML = productCards;
    };

    const setupPagination = (products, wrapper) => {
        if (!wrapper) return;

        wrapper.innerHTML = "";
        const pageCount = Math.ceil(products.length / productsPerPage);

        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const btn = paginationButton(i, products);
            wrapper.appendChild(btn);
        }
    }

    const paginationButton = (page, products) => {
        const button = document.createElement('button');
        button.innerText = page;
        button.classList.add('pagination-btn');
        if (currentPage === page) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentPage = page;
            displayPaginatedProducts(products, productGrid, currentPage);

            let current_active = document.querySelector('.pagination-btn.active');
            if (current_active) {
                current_active.classList.remove('active');
            }
            button.classList.add('active');
        });

        return button;
    }

    setActiveLink();
    fetchProducts();

    // Hero Slider
    var heroSlider = new Swiper(".hero-slider", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});
