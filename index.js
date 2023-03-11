const links = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

function hideNavbar() {
	navbar.style.transform = "translateY(-100px)";
}

function showNavbar() {
	navbar.style.transform = "translateY(0)";
}

// Scroll to section
links.forEach(link => {
	link.addEventListener("click", e => {
		e.preventDefault();
		const hash = link.hash;
		const target = document.querySelector(hash);
		target.scrollIntoView({
			behavior: "smooth",
			alignToTop: true
		});
		if (hash !== "#header") {
			setTimeout(hideNavbar, 500);
		}
	});
});

// Hide navbar on scroll down
let prevScrollPosition = window.pageYOffset;
window.addEventListener("scroll", e => {
	const currentScrollPosition = window.pageYOffset;

	if (currentScrollPosition > prevScrollPosition) {
		hideNavbar();
	} else {
		showNavbar();
	}

	prevScrollPosition = currentScrollPosition;
});
