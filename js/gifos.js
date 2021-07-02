const displaymyGifos_section = (event) => {
	event.preventDefault();
	myGifos_section.classList.remove('hidden');
	heroSection.classList.add('hidden');
	favSection.classList.add('hidden');
	createGifSection.classList.add('hidden');
	trendingSection.classList.remove('hidden');
	window.scrollTo({ top: 0, behavior: 'smooth' });
	displayArrayGifos();

	if (myGifosArray == null || myGifosArray == 0) {
		noGifContainer.classList.remove('hidden');
		myGifosContainer.classList.add('hidden');
	} else {
		noGifContainer.classList.add('hidden');
		myGifosContainer.classList.remove('hidden');
	}
};
myGifosMenu.addEventListener('click', displaymyGifos_section);

const displayArrayGifos = () => {
	myGifosContainer.innerHTML = '';
	myGifosArray = JSON.parse(localStorage.getItem('MyGifs'));
	if (myGifosArray == null) {
		myGifosArray = [];
	} else {
		for (let i = 0; i < myGifosArray.length; i++) {
			fetch(`${getGifByIdEndpoint}?ids=${myGifosArray[i]}&api_key=${apiKey}`)
				.then((response) => response.json())
				.then((misGifosGiphy) => {
					const gifContainer = document.createElement('div');
					gifContainer.classList.add('gif_container');
					gifContainer.innerHTML = `
					<img class="gif" src="${misGifosGiphy.data[0].images.original.url}" alt="Gif Creado por el usuario">
					<div class="gifActions">
						<div class="gifActions_btn">
							<div class="btn remove" onclick="removeMyGifos('${misGifosGiphy.data[0].id}')"></div>
							<div class="btn download" onclick="downloadGif('${misGifosGiphy.data[0].images.original.url}','Gif')"></div>
							<div class="btn maximize" onclick="maximizeFavoriteGif('${misGifosGiphy.data[0].images.original.url}','User','Gif')"></div>
						</div>
						<div class="gif_info">
							<p class="gif_user">User</p>
							<p class="gif_title">Gif</p>
						</div>
					</div>`;
					myGifosContainer.appendChild(gifContainer);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}
};