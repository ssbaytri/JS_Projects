var menuIcon = document.querySelector(".menu-icon");
var sideBar = document.querySelector(".sidebar");

menuIcon.onclick = function() {
	sideBar.classList.toggle("small-sidebar");
}
