
const removeGif = (gif) => {
	let arrFavoriteParsed = JSON.parse(localStorage.getItem('FavoriteGifs'));
	for (let i = 0; i < arrFavoriteParsed.length; i++) {
		if (arrFavoriteParsed[i].gif === gif) {
			arrFavoriteParsed.splice(i, 1);
			localStorage.setItem(
				'FavoriteGifs',
				JSON.stringify(arrFavoriteParsed)
			);
			displayFavorites(event);
			closePopUp();
		}
	}
};

const removeMyGifos = (gif) => {
	window.event.preventDefault();
	let myGifosArrayParsed = JSON.parse(localStorage.getItem('MyGifs'));
	for (let i = 0; i < myGifosArrayParsed.length; i++) {
		if (myGifosArrayParsed[i] == gif) {
			myGifosArrayParsed.splice(i, 1);
			localStorage.setItem('MyGifs', JSON.stringify(myGifosArrayParsed));
			displaymyGifos_section(event);
			closePopUp();
		}
	}
};
