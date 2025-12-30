document.addEventListener("DOMContentLoaded", function () {


//Product data (later this will come from database)
const products=[
  {id: 1, name: "Patanjali Honey", price: 150 },
  {id: 2, name: "Patanjali Dant Kanti", price: 60},
  {id: 3, name: "Patanjal Aloe Vera Gel", price: 120}
  
];

const productList=document.getElementById("productList");
const cartList=document.getElementById("cart");
const totalEl= document.getElementById("total");

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

//New Cart logic with quantity
window.addToCart= function (productId) {
  const product = product.find(p => p.id === productid);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
};

function renderCart(){
  cartList.i="";
  let total = 0;

  cart.forEach(item => {
    const li= document.createElement("li");
    li.textContent=`${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalEl.textContent = total;
}

});
