let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submit");

// get total
function getTotal() {
    let priceValue = parseFloat(price.value) || 0;
    let taxesValue = parseFloat(taxes.value) || 0;
    let adsValue = parseFloat(ads.value) || 0;
    let discountceValue = parseFloat(discount.value) || 0;
    if (price.value != "") {
        let totalValue = priceValue + taxesValue + adsValue - discountceValue;
        total.textContent = totalValue;
        total.style.background = "#040";
    } else {
        total.style.background = "rgb(218, 18, 18)";
        total.textContent = "0";
    }
}
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);
// create products
let dataProfiles;
if (localStorage.product != null) {
    dataProfiles = JSON.parse(localStorage.product);
}else{
    dataProfiles = [];
}


submitBtn.onclick = function() {
    let newProfile = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value
    }
    dataProfiles.push(newProfile);
    localStorage.setItem("product", JSON.stringify(dataProfiles));
}

// save to local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data
