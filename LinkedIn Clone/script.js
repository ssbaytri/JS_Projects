let profileMenu = document.getElementById("profile-menu");
let sidebarActivity = document.querySelector(".sidebar-activity");
let moreLink = document.getElementById("show-more-link");

function toggleMenu() {
	profileMenu.classList.toggle("open-menu");
}

function toggleActivity() {
	sidebarActivity.classList.toggle("open");
	if (sidebarActivity.classList.contains("open")) {
		moreLink.innerHTML = "Show less <b>-</b>"
	}
	else {
		moreLink.innerHTML = "Show more <b>+</b>"
	}
}

// ---------------- END OF PROJECT -----------------