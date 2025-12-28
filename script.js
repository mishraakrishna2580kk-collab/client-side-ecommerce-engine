document.addEventListener("DOMContentLoaded", function () {


//Product data (later this will come from database)
const products=[
  {id: 1, name: "Patanjali Honey", price: 150 },
  {id: 2, name: "Patanjali Dant Kanti", price: 60},
  {id: 3, name: "Patanjal Aloe Vera Gel", price: 120}
  
];

const productList=document.getElementById("productList");
const cartList=document.getElementById("cart");

let cart=[];

//show products on page
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h4>${product.name}</h4>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

//Add product to cart
function addToCart(productId) {
  const product=products.find(p => p.id === productId);
  cart.push(product);
  renderCart();
}

//show cart items
function renderCart() {
  cartList.innerHTML="";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent=`${item.name} - ₹${item.price} `;
    cartList.appendChild(li);
  });
}

});
