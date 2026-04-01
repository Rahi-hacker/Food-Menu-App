let menuData = [];
let cart = [];
let total = 0;

// Load menu.json
fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    menuData = data;
    console.log("Menu Loaded:", menuData); // Debug
    displayMenu(menuData);
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });


// Display Menu
function displayMenu(data) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-content">
        <h2>${item.name}</h2>
        <p>${item.category}</p>
        <p class="price">${item.price}</p>
        <button onclick="addToCart('${item.name}', ${parseInt(item.price.replace('₹',''))})">
          Add to Cart
        </button>
      </div>
    `;

    menu.appendChild(card);

    // Animation delay
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150);
  });
}


// Add to Cart
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("total").innerText = total;
}


// Filter Menu
function filterMenu(category) {
  if (category === "all") {
    displayMenu(menuData);
  } else {
    const filtered = menuData.filter(item => item.category === category);
    displayMenu(filtered);
  }
}


// Search Function
document.getElementById("search").addEventListener("keyup", function(e) {
  const value = e.target.value.toLowerCase();

  const filtered = menuData.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  displayMenu(filtered);
});


// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}