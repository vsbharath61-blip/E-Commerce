// E-Commerce Website JavaScript - Fixed Version

class ECommerceApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentSection = 'home';
        
        // Product data
        this.products = [
            {
                id: 1,
                name: "Wireless Headphones Pro",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                category: "Electronics",
                rating: 4.8
            },
            {
                id: 2,
                name: "Smart Watch Series X",
                price: 399.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                category: "Electronics",
                rating: 4.9
            },
            {
                id: 3,
                name: "Designer Sunglasses",
                price: 159.99,
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
                category: "Fashion",
                rating: 4.7
            },
            {
                id: 4,
                name: "Luxury Handbag",
                price: 599.99,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
                category: "Fashion",
                rating: 4.6
            },
            {
                id: 5,
                name: "Smart Home Speaker",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                category: "Electronics",
                rating: 4.5
            },
            {
                id: 6,
                name: "Minimalist Plant Pot",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
                category: "Home & Garden",
                rating: 4.4
            },
            {
                id: 7,
                name: "Leather Jacket",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
                category: "Fashion",
                rating: 4.8
            },
            {
                id: 8,
                name: "Modern Table Lamp",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                category: "Home & Garden",
                rating: 4.3
            },
            {
                id: 9,
                name: "Wireless Mouse",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
                category: "Electronics",
                rating: 4.6
            },
            {
                id: 10,
                name: "Scented Candles Set",
                price: 39.99,
                image: "https://images.unsplash.com/photo-1602874801007-62cb17d11c2d?w=400",
                category: "Home & Garden",
                rating: 4.7
            },
            {
                id: 11,
                name: "Running Shoes",
                price: 149.99,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                category: "Fashion",
                rating: 4.9
            },
            {
                id: 12,
                name: "Bluetooth Keyboard",
                price: 119.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
                category: "Electronics",
                rating: 4.5
            }
        ];

        // Categories data
        this.categories = [
            {
                name: "Electronics",
                icon: "📱",
                description: "Latest tech gadgets and devices"
            },
            {
                name: "Fashion",
                icon: "👗",
                description: "Trendy clothing and accessories"
            },
            {
                name: "Home & Garden",
                icon: "🏡",
                description: "Beautiful home decor and garden items"
            },
            {
                name: "Sports & Fitness",
                icon: "⚽",
                description: "Equipment for active lifestyle"
            },
            {
                name: "Books & Media",
                icon: "📚",
                description: "Books, movies, and entertainment"
            },
            {
                name: "Beauty & Health",
                icon: "💄",
                description: "Skincare, makeup, and wellness products"
            }
        ];

        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        this.setupEventListeners();
        this.initTheme();
        this.loadProducts();
        this.loadCategories();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showSection('home'); // Ensure home section is visible by default
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Brand/Logo click to go home
        const brand = document.querySelector('.brand-text');
        if (brand) {
            brand.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection('home');
            });
            brand.style.cursor = 'pointer';
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection('cart');
            });
        }

        // Footer navigation links
        const footerLinks = document.querySelectorAll('.footer-section a[href="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const text = link.textContent.toLowerCase().trim();
                
                if (text.includes('electronics') || text.includes('fashion') || text.includes('home')) {
                    this.showSection('categories');
                } else if (text.includes('help') || text.includes('support')) {
                    this.showSection('help');
                } else if (text.includes('contact')) {
                    this.showSection('help');
                } else {
                    this.showSection('home');
                }
            });
        });

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e);
            });
        }

        // Hero CTA button
        const heroCta = document.querySelector('.hero-cta');
        if (heroCta) {
            heroCta.addEventListener('click', (e) => {
                e.preventDefault();
                setTimeout(() => {
                    const productsSection = document.querySelector('.product-grid');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        }

        // Continue Shopping button in empty cart
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Continue Shopping') {
                e.preventDefault();
                this.showSection('home');
            }
        });

        // Theme preference radio buttons
        document.addEventListener('change', (e) => {
            if (e.target.name === 'theme') {
                this.setTheme(e.target.value);
            }
        });

        // Toggle switches in personalize section
        document.addEventListener('change', (e) => {
            if (e.target.closest('.toggle-switch')) {
                this.handleSettingToggle(e);
            }
        });

        // Checkout button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('checkout-btn')) {
                e.preventDefault();
                this.handleCheckout();
            }
        });

        // Global click handler for various elements
        document.addEventListener('click', (e) => {
            // Help cards navigation
            if (e.target.closest('.help-card .btn')) {
                e.preventDefault();
                this.showNotification('Feature coming soon!');
            }

            // Account links
            if (e.target.closest('.account-link')) {
                e.preventDefault();
                this.showNotification('Account feature coming soon!');
            }
        });
    }

    initTheme() {
        this.setTheme(this.currentTheme);
        this.updateThemeToggleIcon();
        
        // Set radio button state
        setTimeout(() => {
            const themeRadio = document.querySelector(`input[name="theme"][value="${this.currentTheme}"]`);
            if (themeRadio) {
                themeRadio.checked = true;
            }
        }, 100);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggleIcon();
        
        // Update radio button
        setTimeout(() => {
            const themeRadio = document.querySelector(`input[name="theme"][value="${theme}"]`);
            if (themeRadio) {
                themeRadio.checked = true;
            }
        }, 100);
    }

    updateThemeToggleIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in-up');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionName;

        // Special handling for different sections
        if (sectionName === 'cart') {
            this.updateCartDisplay();
        } else if (sectionName === 'categories') {
            this.loadCategories();
        } else if (sectionName === 'home') {
            this.loadProducts(); // Reset to show all products
        }
    }

    loadProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            setTimeout(() => {
                productCard.classList.add('fade-in-up');
            }, index * 100);
            productGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const stars = '★'.repeat(Math.floor(product.rating)) + 
                     (product.rating % 1 !== 0 ? '☆' : '') + 
                     '☆'.repeat(5 - Math.ceil(product.rating));

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        `;

        // Add click handler for the add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.addToCart(product.id);
        });

        return card;
    }

    loadCategories() {
        const categoryGrid = document.getElementById('categoryGrid');
        if (!categoryGrid) return;

        categoryGrid.innerHTML = '';

        this.categories.forEach((category, index) => {
            const categoryCard = this.createCategoryCard(category);
            setTimeout(() => {
                categoryCard.classList.add('fade-in-up');
            }, index * 100);
            categoryGrid.appendChild(categoryCard);
        });
    }

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-description">${category.description}</p>
        `;

        card.addEventListener('click', () => {
            this.filterProductsByCategory(category.name);
        });

        return card;
    }

    filterProductsByCategory(categoryName) {
        this.showSection('home');
        
        setTimeout(() => {
            const productGrid = document.getElementById('productGrid');
            if (!productGrid) return;

            productGrid.innerHTML = '';
            
            const filteredProducts = this.products.filter(product => 
                product.category === categoryName
            );

            if (filteredProducts.length === 0) {
                productGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                        <h3>No products found in ${categoryName}</h3>
                        <p>Check back soon for new items!</p>
                        <button class="btn btn--primary" onclick="app.showSection('home')">View All Products</button>
                    </div>
                `;
                return;
            }

            filteredProducts.forEach((product, index) => {
                const productCard = this.createProductCard(product);
                setTimeout(() => {
                    productCard.classList.add('fade-in-up');
                }, index * 100);
                productGrid.appendChild(productCard);
            });

            // Scroll to products
            setTimeout(() => {
                productGrid.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }, 300);
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showAddToCartAnimation();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) return;
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        } else {
            cartCount.style.display = 'none';
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');

        if (this.cart.length === 0) {
            if (cartItems) cartItems.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        if (cartItems) cartItems.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItems) cartItems.innerHTML = '';

        let subtotal = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <strong>$${itemTotal.toFixed(2)}</strong>
                    <button class="btn btn--outline" data-action="remove" data-id="${item.id}" style="margin-top: 8px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            // Add event listeners for quantity controls
            const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
            const increaseBtn = cartItem.querySelector('[data-action="increase"]');
            const removeBtn = cartItem.querySelector('[data-action="remove"]');

            if (decreaseBtn) {
                decreaseBtn.addEventListener('click', () => this.updateQuantity(item.id, -1));
            }
            if (increaseBtn) {
                increaseBtn.addEventListener('click', () => this.updateQuantity(item.id, 1));
            }
            if (removeBtn) {
                removeBtn.addEventListener('click', () => this.removeFromCart(item.id));
            }

            if (cartItems) cartItems.appendChild(cartItem);
        });

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    showAddToCartAnimation() {
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.classList.add('bounce');
            setTimeout(() => cartBtn.classList.remove('bounce'), 300);
        }
    }

    showNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1001;
            font-weight: 500;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    handleNewsletterSignup(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            this.showNotification('Thank you for subscribing to our newsletter!');
            e.target.reset();
        } else {
            this.showNotification('Please enter a valid email address');
        }
    }

    handleSettingToggle(e) {
        const setting = e.target.closest('.setting-item').querySelector('span').textContent;
        const isEnabled = e.target.checked;
        
        this.showNotification(`${setting} ${isEnabled ? 'enabled' : 'disabled'}`);
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }

        // Simulate checkout process
        this.showNotification('Redirecting to secure checkout...');
        
        setTimeout(() => {
            this.showNotification('Order placed successfully! Thank you for your purchase.');
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.updateCartDisplay();
        }, 2000);
    }
}

// Initialize the application when DOM is ready
let app;

function initApp() {
    app = new ECommerceApp();
}

// Make sure the app initializes properly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Global functions for backwards compatibility
window.addToCart = function(productId) {
    if (app) app.addToCart(productId);
};

window.updateQuantity = function(productId, change) {
    if (app) app.updateQuantity(productId, change);
};

window.removeFromCart = function(productId) {
    if (app) app.removeFromCart(productId);
};

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && app) {
        app.updateCartDisplay();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.style.opacity = '0.5';
                img.alt = 'Image not available';
            });
        }
    });
});