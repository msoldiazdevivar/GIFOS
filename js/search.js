let cleanSearched = () => {
	searchSuggestionList.classList.add('hidden');
	searchSuggestionList.innerHTML = '';
};

let offsetSearch = 0;

const getSearch = async (search) => {
	window.event.preventDefault();
	cleanSearched();
	searchInputHero.value = search;
	navbarSearchInput.value = search;
	searchTitle.innerHTML = search;

	if (offsetSearch === 0) {
		search_resultsGallery.innerHTML = '';
	}
 fetch( `${searchEndpoint}?api_key=${apiKey}&q=${search}&offset=${offsetSearch}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((results) => {
			if (results.data == 0) {
				noResultsMessage();
			} else {
				showSearchedGifs(results);
			}
		})
		.catch((err) => console.error(err));
};

const showSearchedGifs = (results) => {
	search_resultsContainer.classList.remove('hidden');
	verMasbtn.classList.remove('hidden');

	if (results.data.length < 12) {
		verMasbtn.style.display = 'none';
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif_container');
		gifContainer.innerHTML = ` 
		<img class="gif" onclick="maximizeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"
		src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
		<div class="gifActions">
			<div class="gifActions_btn">
				<div class="btn favorite" onclick="addToFav('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
				<div class="btn download" onclick="downloadGif('${results.data[i].images.original.url}','${results.data[i].title}')"></div>
				<div class="btn maximize" onclick="maximizeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
			</div>
			<div class="gif_info">
				<p class="gif_user">${results.data[i].username}</p>
				<p class="gif_title">${results.data[i].title}</p>
			</div>
		</div> `;
		search_resultsGallery.appendChild(gifContainer);
	}
};

const noResultsMessage = () => {
	search_resultsContainer.classList.remove('hidden');
	error_container.classList.remove('hidden');
	error_container.innerHTML = `<div class="error_container" id="error-container">
		<img class="" id="error-search" src="assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" >
	</div>	`;
};

const getSearchSuggestions = async () => {
	cleanSearched();
	searchSuggestionList.classList.remove('hidden');
	const searchInput = searchInputHero.value;

	if (searchInput.length >= 1) {
		fetch(`${searchAutocomplete}?api_key=${apiKey}&q=${searchInput}&limit=4&rating=g`)
			.then((response) => response.json())
			.then((suggestions) => {
				displaySuggestions(suggestions);
			})
			.catch((err) => {
				console.error(err);
			});
	}
};

const displaySuggestions = (suggestions) => {
	for (let i = 0; i < suggestions.data.length; i++) {
		const searchSuggestionItem = document.createElement('li');
		searchSuggestionItem.classList.add('SearchSuggestions_item');
		searchSuggestionItem.innerHTML = `
		<img class="search_btnGray" id="" src="assets/icon-search-gray.svg" alt="Boton Buscar" onclick="getSearch('${suggestions.data[i].name}')">
		<p class="search_Text" onclick="getSearch('${suggestions.data[i].name}')">${suggestions.data[i].name}</p>`;
		searchSuggestionList.appendChild(searchSuggestionItem);
	}
};

const btnVerMas = () => {
	offsetSearch += 12;
	if (searchInputHero.value) {
		getSearch(searchInputHero.value);
	} else {
		getSearch(navbarSearchInput.value);
	}
};

const cleanAllResults = () => {
	search_resultsContainer.classList.add('hidden');
	error_container.classList.add('hidden');
	verMasbtn.style.display = 'block';
	search_resultsGallery.innerHTML = '';
	navbarSearchInput.placeholder = 'Busca GIFOS y más';
	searchInputHero.placeholder = 'Busca GIFOS y más';
};

const setActiveSearchBar = () => {
	searchGrayBtn.classList.remove('hidden');
	searchCloseBtn.classList.remove('hidden');
	searchBtn.classList.add('hidden');
	searchSuggestionsContainer.classList.remove('hidden');
	searchContainer.classList.add('searchActive');
	searchSuggestionsContainer.classList.add('searchActiveContainer');
};

const setActiveNavbarSearch = () => {
	navbarSearchGrayBtn.classList.remove('hidden');
	navbarSearchCloseBtn.classList.remove('hidden');
	navbarSearchBtn.classList.add('hidden');
};

const setInactiveNavbarSearch = () => {
	navbarSearchInput.value = '';
	searchInputHero.value = '';
	cleanAllResults();
	navbarSearchBtn.classList.remove('hidden');
	navbarSearchCloseBtn.classList.add('hidden');
	navbarSearchGrayBtn.classList.add('hidden');
};

const setInactiveSearchBar = () => {
	navbarSearchInput.value = '';
	searchInputHero.value = '';
	cleanAllResults();
	cleanSearched();
	searchSuggestionsContainer.classList.add('hidden');
	searchBtn.classList.remove('hidden');
	searchCloseBtn.classList.add('hidden');
	searchGrayBtn.classList.add('hidden');
	searchContainer.classList.remove('searchActive');
};
searchGrayBtn.addEventListener('click', () => {
	getSearch(searchInputHero.value);
});
searchInputHero.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch(searchInputHero.value);
	}
});
searchInputHero.addEventListener('click', setActiveSearchBar);
searchInputHero.addEventListener('input', setActiveSearchBar);
searchInputHero.addEventListener('input', getSearchSuggestions);
searchInputHero.addEventListener('input', cleanAllResults);

searchCloseBtn.addEventListener('click', setInactiveSearchBar);
verMasbtn.addEventListener('click', btnVerMas);

navbarSearchGrayBtn.addEventListener('click', () => {
	getSearch(navbarSearchInput.value);
});

navbarSearchInput.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch(navbarSearchInput.value);
	}
});

navbarSearchInput.addEventListener('click', setActiveNavbarSearch);
navbarSearchInput.addEventListener('input', setActiveNavbarSearch);
navbarSearchCloseBtn.addEventListener('click', setInactiveNavbarSearch);
navbarSearchInput.addEventListener('input', cleanAllResults);
