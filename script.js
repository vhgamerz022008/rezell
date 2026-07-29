// ======================================
// script.js
// ======================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-buttons button");

let activeCategory = "all";
let searchText = "";

// Render Products
function renderProducts() {

    let filtered = PRODUCTS.filter(product => {

        const categoryMatch =
            activeCategory === "all" ||
            product.category === activeCategory;

        const searchMatch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return categoryMatch && searchMatch;

    });

    if(filtered.length===0){

        productGrid.innerHTML=`
        <div class="no-products">
            <h2>No Products Found</h2>
        </div>
        `;

        return;

    }

    productGrid.innerHTML = filtered.map(product => `

<div class="card">

<img
src="${product.image}"
alt="${product.name}"
onclick="openProduct('${product.id}')"
>

<div class="card-content">

<div class="card-category">

${product.category}

</div>

<h3>

${product.name}

</h3>

<div class="price">

₹${product.price}

</div>

<p>

⭐ ${product.rating}

</p>

<div class="card-buttons">

<button
class="details-btn"
onclick="openProduct('${product.id}')">

View Details

</button>

<button
class="buy-btn"
onclick="buyProduct('${product.id}')">

Buy Now

</button>

</div>

</div>

</div>

`).join("");

}

// Product Page
function openProduct(id){

window.location.href=`product.html?id=${id}`;

}

// Buy Button
function buyProduct(id){

const product=PRODUCTS.find(p=>p.id===id);

const subject=encodeURIComponent(`Order for ${product.name}`);

const body=encodeURIComponent(

`Hi Rezell,

I would like to order:

${product.name}

Price : ₹${product.price}

Please contact me.

Thank You.`

);

window.location.href=`mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;

}

// Search
searchInput.addEventListener("keyup",(e)=>{

searchText=e.target.value;

renderProducts();

});

// Category Filter
categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

categoryButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

activeCategory=button.dataset.category;

renderProducts();

});

});

// Load Products
renderProducts();