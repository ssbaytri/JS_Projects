var settingsMenu = document.querySelector(".settings-menu")
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle() {
	settingsMenu.classList.toggle("settings-menu-height");
}

function darkTheme() {
	darkBtn.classList.toggle("dark-btn-on");
}
