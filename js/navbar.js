function scrolledNavbar() {
	if (document.documentElement.scrollTop > 600) {
		if (window.innerWidth < 1024) {
			navbarSearchContainer.classList.add('hiddenSearchBar');
		} else {
			navbarSearchContainer.classList.remove('hiddenSearchBar');
		}
	} else {
		navbarSearchContainer.classList.add('hiddenSearchBar');
	}
}

const displayBurgerMenu = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		if (navbarList.classList.contains('hiddenMenu')) {
			navbarList.classList.remove('hiddenMenu');
			burgerMenu.src = 'assets/close-modo-noct.svg';
		} else {
			navbarList.classList.add('hiddenMenu');
			burgerMenu.src = 'assets/burger-modo-noct.svg';
		}
	} else {
		if (navbarList.classList.contains('hiddenMenu')) {
			navbarList.classList.remove('hiddenMenu');
			burgerMenu.src = 'assets/close.svg';
		} else {
			navbarList.classList.add('hiddenMenu');
			burgerMenu.src = 'assets/burger.svg';
		}
	}
};

burgerMenu.addEventListener('click', displayBurgerMenu);
favGifs.addEventListener('click', displayBurgerMenu);

createMyGifBtn.addEventListener('click', () => {
	createMyGifBtn.src = 'assets/CTA-crear-gifo-active.svg';
});

createMyGifBtn.addEventListener('mouseover', () => {
	createMyGifBtn.src = 'assets/CTA-crear-gifo-hover.svg';
});

createMyGifBtn.addEventListener('mouseout', () => {
	createMyGifBtn.src = 'assets/button-crear-gifo.svg';
});

window.addEventListener('scroll', scrolledNavbar);

const displayCreateGifSection = (event) => {
	event.preventDefault();
	createGifSection.classList.remove('hidden');
	heroSection.classList.add('hidden');
	favSection.classList.add('hidden');
	trendingSection.classList.add('hidden');
	myGifos_section.classList.add('hidden');
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

const displayMainSection = (event) => {
	event.preventDefault();
	heroSection.classList.remove('hidden');
	myGifos_section.classList.add('hidden');
	favSection.classList.add('hidden');
	createGifSection.classList.add('hidden');
	trendingSection.classList.remove('hidden');
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

createMyGifMenu.addEventListener('click', displayCreateGifSection);
logoIdLink.addEventListener('click', displayMainSection);
