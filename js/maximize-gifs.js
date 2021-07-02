const maximizeGif = (gif, username, title) => {
	maximizedGifSection.classList.remove('hidden');
	maximizedGifSection.classList.add('maximizedGif');
	maximizedGifSection.innerHTML = '';
	const maximizedGifContainer = document.createElement('div');
	maximizedGifContainer.classList.add('maximizedGif_container');
	maximizedGifContainer.innerHTML = `
	<div class="close-btn" id="close-max-btn" onclick="closePopUp()"></div>

	<div class="maxGif_Container">
		<img class="gifMax" src="${gif}" alt="${title}">
	</div>

	<div class="gifMaxActions">
		<div class="gif_info">
			<p class="gif_user">${username}</p>
			<p class="gif_title">${title}</p>
		</div>
		<div class="gifMaxActions_btn">
			<div class="buttonsMax favoriteMax" onclick="addToFav('${gif}', '${username}', '${title}')"></div>
			<div class="buttonsMax downloadMax" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	maximizedGifSection.appendChild(maximizedGifContainer);
};

const maximizeFavoriteGif = (gif, username, title) => {
	maximizedGifSection.classList.remove('hidden');
	maximizedGifSection.classList.add('maximizedGif');
	maximizedGifSection.innerHTML = '';
	const maximizedGifContainer = document.createElement('div');
	maximizedGifContainer.classList.add('maximizedGif_container');
	maximizedGifContainer.innerHTML = `
	<div class="close-btn" id="close-max-btn" onclick="closePopUp()"></div>

	<div class="maxGif_Container">
		<img class="gifMax" src="${gif}" alt="${title}">
	</div>

	<div class="gifMaxActions">
		<div class="gif_info">
			<p class="gif_user">${username}</p>
			<p class="gif_title">${title}</p>
		</div>
		<div class="gifMaxActions_btn">
			<div class="buttonsMax removeMax" onclick="removeGif('${gif}')"></div>
			<div class="buttonsMax downloadMax" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	maximizedGifSection.appendChild(maximizedGifContainer);
};

const closePopUp = () => {
	maximizedGifSection.classList.add('hidden');
	maximizedGifSection.classList.remove('maximizedGif');
};
