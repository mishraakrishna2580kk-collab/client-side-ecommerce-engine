// --- State Management ---
let defaultProducts = [
  { id: 1, name: "Patanjali Honey", price: 150, mrp: 180, category: "grocery", rating: 4.5, badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1587049352847-4d4b1a207223?auto=format&fit=crop&w=400&q=80", desc: "Pure natural honey" },
  { id: 2, name: "Patanjali Dant Kanti", price: 60, mrp: 75, category: "personal", rating: 4.8, badge: "NEW", image: "https://images.unsplash.com/photo-1629235313888-eb28551a37c9?auto=format&fit=crop&w=400&q=80", desc: "Herbal toothpaste" },
  { id: 3, name: "Patanjali Aloe Vera Gel", price: 120, mrp: 150, category: "cosmetic", rating: 4.7, badge: "POPULAR", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80", desc: "For skin and hair" },
  { id: 4, name: "Patanjali Chyawanprash", price: 299, mrp: 350, category: "health", rating: 4.9, badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1615486171448-4fbafddc33b2?auto=format&fit=crop&w=400&q=80", desc: "Immunity booster" },
  { id: 5, name: "Patanjali Amla Juice", price: 120, mrp: 140, category: "beverages", rating: 4.6, badge: "SALE", image: "https://images.unsplash.com/photo-1622597467836-f38ec317d7b6?auto=format&fit=crop&w=400&q=80", desc: "Natural source of Vit C" },
  { id: 6, name: "Patanjali Cow Ghee", price: 650, mrp: 700, category: "grocery", rating: 4.8, badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135f419?auto=format&fit=crop&w=400&q=80", desc: "Pure cow milk ghee" },
  { id: 7, name: "Kesh Kanti Hair Oil", price: 130, mrp: 150, category: "personal", rating: 4.4, badge: "", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80", desc: "Herbal hair oil" },
  { id: 8, name: "Atta Noodles", price: 15, mrp: 20, category: "grocery", rating: 4.3, badge: "NEW", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80", desc: "Healthy wheat noodles" },
  { id: 9, name: "Saundarya Face Wash", price: 90, mrp: 100, category: "cosmetic", rating: 4.7, badge: "", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80", desc: "Gentle herbal face wash" },
  { id: 10, name: "Patanjali Oats", price: 140, mrp: 160, category: "grocery", rating: 4.6, badge: "", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80", desc: "High fiber breakfast" },
  { id: 11, name: "Ojas Aquafresh Soap", price: 35, mrp: 40, category: "personal", rating: 4.2, badge: "", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80", desc: "Refreshing body soap" },
  { id: 12, name: "Patanjali Besan", price: 95, mrp: 110, category: "grocery", rating: 4.8, badge: "", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80", desc: "Pure chana gram flour" },
  { id: 13, name: "Divya Herbal Peya", price: 70, mrp: 85, category: "beverages", rating: 4.5, badge: "POPULAR", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80", desc: "Ayurvedic herbal tea" },
  { id: 14, name: "Mustard Oil", price: 170, mrp: 190, category: "grocery", rating: 4.7, badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80", desc: "Cold pressed cooking oil" },
  { id: 15, name: "Giloy Ghanvati", price: 100, mrp: 110, category: "health", rating: 4.9, badge: "", image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=400&q=80", desc: "Immunity booster tablets" }
];

let products = JSON.parse(localStorage.getItem('patanjali_products'));
if (!products || products.length < 15) {
  products = defaultProducts;
  localStorage.setItem('patanjali_products', JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem('patanjali_cart')) || [];
let currentCategory = 'all';
let currentSort = 'default';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Hide Preloader
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1000);

  initTheme();
  renderCategories();
  renderProducts();
  updateCartCount();
  renderCart();
  initAnimations();

  // Save initial products if not in local storage
  if (!localStorage.getItem('patanjali_products')) {
    saveProducts();
  }
});

// --- Theme & Navbar ---
function initTheme() {
  const isDark = localStorage.getItem('theme') === 'dark';
  if (isDark) document.body.setAttribute('data-theme', 'dark');
}

function toggleDarkMode() {
  const isDark = document.body.hasAttribute('data-theme');
  if (isDark) {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}

function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.padding = '10px 0';
  } else {
    nav.style.padding = '15px 0';
  }
});

// --- Products Rendering ---
function renderCategories() {
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const container = document.getElementById('categoryPills');
  container.innerHTML = categories.map(cat => 
    `<button class="category-pill ${currentCategory === cat ? 'active' : ''}" onclick="filterProducts('${cat}')">
      ${cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>`
  ).join('');
}

function filterProducts(category) {
  currentCategory = category;
  renderCategories(); // update active state
  renderProducts();
}

function sortProducts(sortType) {
  currentSort = sortType;
  renderProducts();
}

document.getElementById('searchInput')?.addEventListener('input', renderProducts);

function renderProducts() {
  const grid = document.getElementById('productList');
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  
  let filtered = products.filter(p => {
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (currentSort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (currentSort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (currentSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (currentSort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  document.getElementById('resultsCount').innerText = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found.</p>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=${p.name.split(' ')[0]}'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.name}</h3>
        <div class="product-rating">⭐ ${p.rating}</div>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 10px;">${p.desc}</p>
        <div class="product-price-wrap">
          <span class="product-price">₹${p.price}</span>
          ${p.mrp > p.price ? `<span class="product-mrp">₹${p.mrp}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${p.id})">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function setGridView(view) {
  const grid = document.getElementById('productList');
  if (view === 'list') {
    grid.classList.add('list-view');
  } else {
    grid.classList.remove('list-view');
  }
}

// --- Cart Logic ---
function saveCart() {
  localStorage.setItem('patanjali_cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').innerText = count;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  saveCart();
  showNotification(`${product.name} added to cart!`);
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  
  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function renderCart() {
  const drawerBody = document.getElementById('drawerCart');
  const checkoutList = document.getElementById('checkoutCartList');
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  document.getElementById('drawerTotal').innerText = total;
  if(document.getElementById('checkoutTotal')) {
    document.getElementById('checkoutTotal').innerText = total;
  }

  if (cart.length === 0) {
    const emptyHTML = `
      <div class="empty-cart" style="text-align:center; padding-top:40px;">
        <i class="fa-solid fa-cart-shopping" style="font-size:3rem; color:var(--text-muted); margin-bottom:15px;"></i>
        <p>Your cart is empty</p>
      </div>`;
    drawerBody.innerHTML = emptyHTML;
    if(checkoutList) checkoutList.innerHTML = '<li>Cart is empty</li>';
    return;
  }

  const cartHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/70'">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div style="color: var(--primary); font-weight: 600;">₹${item.price}</div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');

  drawerBody.innerHTML = cartHTML;
  
  if (checkoutList) {
    checkoutList.innerHTML = cart.map(item => `
      <li style="display:flex; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid var(--border);">
        <span>${item.name} (x${item.qty})</span>
        <strong>₹${item.price * item.qty}</strong>
      </li>
    `).join('');
  }
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').style.display = 'block';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').style.display = 'none';
}

function goToCheckout() {
  if (cart.length === 0) {
    showNotification('Cart is empty!');
    return;
  }
  closeCart();
  document.getElementById('checkout').style.display = 'block';
  setTimeout(() => {
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// --- WhatsApp Order ---
function placeOrder() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details.");
    return;
  }
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  let message = `*New Order from Website*\n\n`;
  message += `*Customer:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n\n*Items:*\n`;
  
  let total = 0;
  cart.forEach(item => {
    message += `- ${item.name} (x${item.qty}) = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\n*Total Amount: ₹${total}*`;

  const phoneNum = "919000000000"; // Replace with actual WhatsApp number
  const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
  
  // Clear after order
  setTimeout(() => {
    if(confirm("Did you place the order successfully? Click OK to clear cart.")) {
      cart = [];
      saveCart();
      document.getElementById('customerName').value = '';
      document.getElementById('customerPhone').value = '';
      document.getElementById('customerAddress').value = '';
      document.getElementById('checkout').style.display = 'none';
      window.scrollTo(0, 0);
    }
  }, 2000);
}

// --- Admin Panel ---
function toggleAdmin() {
  const panel = document.getElementById('adminPanel');
  const overlay = document.getElementById('adminOverlay');
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
    overlay.style.display = 'none';
  } else {
    panel.classList.add('open');
    overlay.style.display = 'block';
    renderAdminProducts();
  }
}

function saveProducts() {
  localStorage.setItem('patanjali_products', JSON.stringify(products));
}

function renderAdminProducts() {
  document.getElementById('adminProductCount').innerText = products.length;
  const list = document.getElementById('adminProductList');
  list.innerHTML = products.map(p => `
    <div class="admin-product-item">
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${p.image}" width="40" height="40" style="object-fit:cover; border-radius:4px;" onerror="this.src='https://via.placeholder.com/40'">
        <div>
          <strong>${p.name}</strong>
          <div style="font-size:0.8rem; color:var(--text-muted);">₹${p.price} | ${p.category}</div>
        </div>
      </div>
      <div>
        <button class="qty-btn" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="qty-btn" style="color:red;" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function saveProduct() {
  const idStr = document.getElementById('adminEditId').value;
  const name = document.getElementById('adminProductName').value.trim();
  const price = parseFloat(document.getElementById('adminProductPrice').value);
  const mrp = parseFloat(document.getElementById('adminProductMRP').value);
  const category = document.getElementById('adminProductCategory').value;
  const rating = parseFloat(document.getElementById('adminProductRating').value) || 4.5;
  const badge = document.getElementById('adminProductBadge').value;
  const desc = document.getElementById('adminProductDesc').value.trim();
  const image = document.getElementById('adminProductImage').value.trim() || 'https://via.placeholder.com/200';

  if (!name || isNaN(price)) {
    alert("Name and Price are required!");
    return;
  }

  if (idStr) {
    // Edit
    const id = parseInt(idStr);
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = { id, name, price, mrp: mrp || price, category, rating, badge, desc, image };
    }
  } else {
    // Add
    const id = Date.now();
    products.push({ id, name, price, mrp: mrp || price, category, rating, badge, desc, image });
  }

  saveProducts();
  renderProducts();
  renderCategories();
  renderAdminProducts();
  resetAdminForm();
  showNotification("Product saved successfully!");
}

function editProduct(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;
  
  document.getElementById('adminEditId').value = p.id;
  document.getElementById('adminProductName').value = p.name;
  document.getElementById('adminProductPrice').value = p.price;
  document.getElementById('adminProductMRP').value = p.mrp || '';
  document.getElementById('adminProductCategory').value = p.category;
  document.getElementById('adminProductRating').value = p.rating;
  document.getElementById('adminProductBadge').value = p.badge || '';
  document.getElementById('adminProductDesc').value = p.desc || '';
  document.getElementById('adminProductImage').value = p.image;
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderProducts();
    renderCategories();
    renderAdminProducts();
    showNotification("Product deleted!");
  }
}

function resetAdminForm() {
  document.getElementById('adminEditId').value = '';
  document.getElementById('adminProductName').value = '';
  document.getElementById('adminProductPrice').value = '';
  document.getElementById('adminProductMRP').value = '';
  document.getElementById('adminProductCategory').value = 'grocery';
  document.getElementById('adminProductRating').value = '';
  document.getElementById('adminProductBadge').value = '';
  document.getElementById('adminProductDesc').value = '';
  document.getElementById('adminProductImage').value = '';
}

// --- Utils & Animations ---
function showNotification(msg) {
  const el = document.getElementById('notification');
  el.innerText = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll, .animate-fade-up').forEach(el => {
    observer.observe(el);
  });

  // Numbers animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.stat-number');
        numbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-count'));
          let current = 0;
          const inc = target / 50;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              num.innerText = target;
              clearInterval(timer);
            } else {
              num.innerText = Math.floor(current);
            }
          }, 40);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });
  
  const statsSec = document.querySelector('.hero-stats');
  if(statsSec) statsObserver.observe(statsSec);
}

function loadMoreProducts() {
  showNotification("All products loaded!");
}

function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if(email && email.includes('@')) {
    showNotification("Subscribed successfully!");
    document.getElementById('newsletterEmail').value = '';
  } else {
    showNotification("Please enter a valid email.");
  }
}