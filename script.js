document.addEventListener("DOMContentLoaded", function () {

  const products = [
    {
      id: 1,
      name: "Patanjali Honey",
      price: 150,
      image: "./assets/honey.jpg",
      category: "grocery",
      rating: 4.5
    },
    {
      id: 2,
      name: "Patanjali Dant Kanti",
      price: 60,
      image: "./assets/dantkanti.jpg",
      category: "personal",
      rating:4.8
    },
    {
      id: 3,
      name: "Patanjali Aloe Vera Gel",
      price: 120,
      image: "./assets/alovera.jpg",
      category: "cosmetic",
      rating: 4.7
    }
  ];

  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  const cartCountEl = document.getElementById("cartCount");

  let cart = [];

  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
      renderCart();
    }
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Search input listener
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
    renderFilteredProducts(filteredProducts);
  });

  // Render products
  function renderFilteredProducts(lists) {
    productList.innerHTML = "";
    lists.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <h4>${product.name}</h4>

      <p class="rating">⭐ ${product.rating}</p>

      <p class="price">₹${product.price}</p>

      <button onclick="addToCart(${product.id})" class="add-btn">
      <i class="fa-solid fa-cart-plus"></i> Add
      </button>
      `;
      productList.appendChild(div);
    });
  }
  window.filterProducts = function(category){

  if(category === "all"){
    renderFilteredProducts(products);
    return;
  }

  const filtered = products.filter(p => p.category === category);

  renderFilteredProducts(filtered);

}

  // Add to cart (exposed globally for onclick)
  function showNotification(){

  const note = document.getElementById("cartNotification");

  note.style.display = "block";

  setTimeout(()=>{
    note.style.display = "none";
  },2000);

}
  window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    showNotification();
  }
  window.increaseQty = function(id) {

  const item = cart.find(p => p.id === id);

  if(item){
    item.quantity++;
    renderCart();
  }

}

window.decreaseQty = function(id) {

  const item = cart.find(p => p.id === id);

  if(item && item.quantity > 1){
    item.quantity--;
  }

  renderCart();

}

window.removeItem = function(id) {

  cart = cart.filter(item => item.id !== id);

  renderCart();

  };

  // Render cart

  function renderCart() {
    cartCountEl.textContent=
      cart.reduce((sum,item)=> sum+ item.quantity,0);
    
    cartList.innerHTML = "";
    let total = 0;
    if(cart.length === 0){
      cartList.innerHTML = `
      <li style="text-align:center;padding:15px;">
            Your cart is empty<br>
        <small>Add products to place an order</small>
      </li>
      `;
    }
    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong>

        <button onclick="decreaseQty(${item.id})">-</button>
        ${item.quantity}
        <button onclick="increaseQty(${item.id})">+</button>

        <span>₹${item.price * item.quantity}</span>

        <button onclick="removeItem(${item.id})">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });
    const drawerCart = document.getElementById("drawerCart");
drawerCart.innerHTML = "";

cart.forEach(item => {

const li = document.createElement("li");

li.innerHTML = `
${item.name}

<button onclick="decreaseQty(${item.id})">-</button>
${item.quantity}
<button onclick="increaseQty(${item.id})">+</button>

= ₹${item.price * item.quantity}
`;

drawerCart.appendChild(li);

});

    totalEl.textContent = total;
    document.getElementById("drawerTotal").textContent = total;
    

    const orderBtn = document.getElementById("placeOrderBtn");
    if (cart.length === 0) {
      orderBtn.disabled = true;
      orderBtn.style.opacity = "0.6";
      orderBtn.style.cursor = "not-allowed";
    } else {
      orderBtn.disabled = false;
      orderBtn.style.opacity = "1";
      orderBtn.style.cursor = "pointer";
    }

    saveCart();
  }

  // Place order via WhatsApp
  window.placeOrder = function () {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address || cart.length === 0) {
      alert("Please fill all details and add products to the cart.");
      return;
    }
    let message = `*New Order*\n\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `Items:\n`;

    cart.forEach(item => {
      message += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\nTotal: ₹${totalEl.textContent}`;

    const whatsappURL = `https://wa.me/0000000000000?text=${encodeURIComponent(message)}`;

    // Open WhatsApp first, then ask to confirm and clear cart
    alert("Preparing your WhatsApp order...");
    window.open(whatsappURL, "_blank");

    const confirmClear = confirm("Order sent! Click OK to clear your cart.");
    if (confirmClear) {
      cart = [];
      localStorage.removeItem("cart");
      renderCart();
      document.getElementById("customerName").value = "";
      document.getElementById("customerPhone").value = "";
      document.getElementById("customerAddress").value = "";
    }
  };

  // Initial load
  renderFilteredProducts(products);
  loadCart();
});
function openCart(){

const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("cartOverlay");

drawer.classList.add("open");
overlay.style.display = "block";

}

function closeCart(){

const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("cartOverlay");

drawer.classList.remove("open");
overlay.style.display = "none";

}
const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
}
});
});

document.querySelectorAll(".why-card").forEach(el=>{
observer.observe(el);
});