let cartIcon = document.querySelector(".cart-icon");
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let productsListHtml = document.querySelector(".products-list");
let cartListHtml = document.querySelector(".cart-list");
let iconCartSpan = document.querySelector('.cart-icon span');

let products = [];
let carts = [];

cartIcon.addEventListener("click", () => {
    body.classList.toggle("show-cart");
})

closeCart.addEventListener("click", () => {
    body.classList.remove("show-cart");
})


function addDataToHtml() {
    productsListHtml.innerHTML = "";
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src=${product.image}>
				<h2>${product.name}</h2>
				<div class="price">$${product.price}</div>
				<button class="addCart">Add To Cart</button>
            `
            productsListHtml.appendChild(newProduct);
        })
    }
}

productsListHtml.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addCart")){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})

function addToCart(product_id) {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id : product_id,
            quantity : 1
        }];
    }else if (positionThisProductInCart < 0) {
        carts.push({
            product_id : product_id,
            quantity : 1
        });
    }else{
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHtml();
}

function addCartToHtml () {
    cartListHtml.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement("div");
            newItem.classList.add("product");
            newItem.dataset = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            newItem.innerHTML = `
            <div class="image"><img src=${info.image}></div>
			<div class="name">${info.name}</div>
			<div class="total-price">$${info.price * item.quantity}</div>
			<div class="quantity">
				<span class="minus"><</span>
				<span class="number">${item.quantity}</span>
				<span class="plus">></span>
            </div>
            `
            cartListHtml.appendChild(newItem);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

function initApp() {
    // get data from json
    fetch("products.json")
    .then(response => response.json())
    .then(data =>{
        products = data;
        addDataToHtml();
    })
}

initApp();