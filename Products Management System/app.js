let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submit");

let mood = "create";
let tmp;

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
    if (mood === "create") {
        if(newProfile.count > 1) {
            for(let i = 0; i < newProfile.count; i++) {
                dataProfiles.push(newProfile);
            }
        }else{
            dataProfiles.push(newProfile);
        }
    }else{
        dataProfiles[tmp] = newProfile;
        mood = "create";
        submitBtn.innerHTML = "Create";
        count.style.display = "block";
    }
    // save to local storage
    localStorage.setItem("product", JSON.stringify(dataProfiles));
    clearData();
    showData();
}

// clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = "0";
    total.style.background = "rgb(218, 18, 18)";
    count.value = "";
    category.value = "";
}

// read
function showData() {
    let table = "";
    let tbody = document.getElementById("tbody");
    for (let i = 0;i < dataProfiles.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataProfiles[i].title}</td>
            <td>${dataProfiles[i].price}</td>
            <td>${dataProfiles[i].taxes}</td>
            <td>${dataProfiles[i].ads}</td>
            <td>${dataProfiles[i].discount}</td>
            <td>${dataProfiles[i].total}</td>
            <td>${dataProfiles[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    tbody.innerHTML = table;
    let deleteAllBtn = document.getElementById("deleteAll");
    if (dataProfiles.length > 0) {
        deleteAllBtn.innerHTML = `<button>Delete All(${dataProfiles.length})</button>`
    }else{
        deleteAllBtn.innerHTML = "";
    }
    deleteAllBtn.addEventListener("click", function(){
        dataProfiles = [];
        localStorage.product = JSON.stringify(dataProfiles);
        showData();
    })
}

showData();

// delete
function deleteData(i) {
    dataProfiles.splice(i, 1);
    localStorage.product = JSON.stringify(dataProfiles);
    showData();
}

// count : Done

// update
function updateData(i) {
    title.value = dataProfiles[i].title;
    price.value = dataProfiles[i].price;
    taxes.value = dataProfiles[i].taxes;
    ads.value = dataProfiles[i].ads;
    discount.value = dataProfiles[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProfiles[i].category;
    submitBtn.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// search
let searchMode = "title";
let titleSearch = document.getElementById("search-title");
let categorySearch = document.getElementById("search-category");
let search = document.getElementById("search");
search.disabled = true;

function getSearchMode(id) {
    if (id == titleSearch.id) {
        searchMode = "title";
        search.disabled = false;
        search.placeholder = "Search By Title";
    }else{
        searchMode = "category";
        search.disabled = false;
        search.placeholder = "Search By Category";
    }
    search.focus()
    console.log(searchMode);
}

search.addEventListener("blur", function(){
    search.disabled = true;
})

titleSearch.onclick = function() {
    getSearchMode(titleSearch.id);
}

categorySearch.onclick = function() {
    getSearchMode(categorySearch.id);
}

// clean data
