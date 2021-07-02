let switchTheme = () => {
	document.body.classList.toggle('darkMode');
		if (document.body.classList.contains('darkMode')) {
			localStorage.setItem('dark-mode', true);
		} else {
			localStorage.setItem('dark-mode', false);
		}
};

switchThemeBtn.addEventListener('click', switchTheme);

let setTheme = () => {
	if (localStorage.getItem('dark-mode') == 'false') {
		document.body.classList.remove('darkMode');
		switchThemeBtn.textContent = 'Modo Nocturno';
	} else {
		document.body.classList.add('darkMode');
		switchThemeBtn.textContent = 'Modo Diurno';
		logo.src = 'assets/logo-mobile-modo-noct.svg';
		burgerMenu.src = 'assets/burger-modo-noct.svg';
		createMyGifBtn.src = 'assets/CTA-crar-gifo-modo-noc.svg';
		navbarsearchBtn.src = 'assets/icon-search-mod-noc.svg';
		navbarsearchCloseBtn.src = 'assets/close-modo-noct.svg';
		searchBtn.src = 'assets/icon-search-mod-noc.svg';
		searchCloseBtn.src = 'assets/close-modo-noct.svg';
		previousBtn.src = 'assets/button-slider-left-md-noct.svg';
		nextBtn.src = 'assets/button-slider-right-md-noct.svg';
		camera.src = 'assets/camara-modo-noc.svg';
		celuloide.src = 'assets/pelicula-modo-noc.svg';
	}
};

setTheme();
