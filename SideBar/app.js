const sideBar = document.querySelector(".sidebar");
const toggleBtn = sideBar.querySelector("ion-icon");

toggleBtn.addEventListener("click", function() {
    sideBar.classList.toggle("active");
})

let listItems = sideBar.querySelectorAll(".item");

function activeLink() {
    listItems.forEach((item) => {
        item.classList.remove("active");
    });
    this.classList.add("active");
}

listItems.forEach((item) => {
    item.addEventListener("click", activeLink);
})