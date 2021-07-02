let arrFavoriteGifs = [];

const addToFav = (gif, username, title) => {
	let gifSetup = {
		gif: gif,
		username: username,
		title: title,
	};
	arrFavoriteGifs.push(gifSetup);
	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
	displayFavoriteGifs();
};

const displayFavorites = (event) => {
	event.preventDefault();
	heroSection.classList.add('hidden');
	myGifos_section.classList.add('hidden');
	createGifSection.classList.add('hidden');
	favSection.classList.remove('hidden');
	displayFavoriteGifs();

	if (arrFavoriteGifs == 0 || arrFavoriteGifs == null) {
		noFavsContainer.classList.remove('hidden');
		favContainer.classList.add('hidden');
	} else {
		noFavsContainer.classList.add('hidden');
		favContainer.classList.remove('hidden');
	}
};

const displayFavoriteGifs = () => {
	favContainer.innerHTML = '';

	arrFavoriteGifs = JSON.parse(localStorage.getItem('FavoriteGifs'));

	if (arrFavoriteGifs == null) {
		arrFavoriteGifs = [];
	} else {
		for (let i = 0; i < arrFavoriteGifs.length; i++) {
			const gifContainer = document.createElement('div');
			gifContainer.classList.add('gif_container');
			gifContainer.innerHTML = ` 
			<img class="gif" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')" src="${arrFavoriteGifs[i].gif}" alt="${arrFavoriteGifs[i].title}">
		
			<div class="gifActions">
				<div class="gifActions_btn">
					<div class="btn remove" onclick="removeGif('${arrFavoriteGifs[i].gif}')"></div>
					<div class="btn download" onclick="downloadGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].title}')"></div>
					<div class="btn maximize" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')"></div>
				</div>
				<div class="gif_info">
					<p class="gif_user">${arrFavoriteGifs[i].username}</p>
					<p class="gif_title">${arrFavoriteGifs[i].title}</p>
				</div>
			</div> `;
			favContainer.appendChild(gifContainer);
		}
	}
};

favGifs.addEventListener('click', displayFavorites);

 const downloadGif = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
	let a = document.createElement('a');
	let file = await response.blob();
	a.download = "myGif"; 
	a.href = window.URL.createObjectURL(file);
	a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
	a.click(); 
};  
