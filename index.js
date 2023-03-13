/* --- Elements --- */

const navbar = document.getElementById("navbar");
const navlinks = document.querySelectorAll(".nav-link");
const projectImages = document.querySelectorAll(".project-image");

/* --- Functions --- */

async function getProfile() {
	const response = await fetch("https://api.github.com/users/kylie-west");
	const data = await response.json();
	return { bio: data.bio, avatar: data.avatar_url };
}

function hideNavbar() {
	navbar.style.transform = "translateY(-100px)";
}

function showNavbar() {
	navbar.style.transform = "translateY(0)";
}

function viewImage(e) {
	if (window.innerWidth <= 800) return;

	const overlay = document.createElement("div");
	const closeButton = document.createElement("div");
	const image = e.target.cloneNode();

	overlay.classList.add("overlay");
	closeButton.classList.add("close-button");
	image.classList.add("enlarged-image");

	overlay.appendChild(closeButton);
	overlay.appendChild(image);

	closeButton.addEventListener("click", () => overlay.remove());
	document.body.prepend(overlay);
}

/* --- Setting up elements and event listeners --- */

// Fetch and insert data from GitHub
getProfile().then(profile => {
	document.getElementById("bio").innerText = profile.bio;
	document.getElementById("profile-photo").src = profile.avatar;
});

// Scroll to section on navlink click
navlinks.forEach(link => {
	link.addEventListener("click", e => {
		e.preventDefault();
		const hash = link.hash;
		const target = document.querySelector(hash);
		target.scrollIntoView({
			behavior: "smooth",
			alignToTop: true
		});
		if (hash !== "#header") {
			setTimeout(hideNavbar, 700);
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

// Enlarge project images on click
projectImages.forEach(image => image.addEventListener("click", viewImage));
