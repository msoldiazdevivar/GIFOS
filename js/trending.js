const trendingTagsEndpoint = 'https://api.giphy.com/v1/trending/searches';
const trendingEndpoint = 'https://api.giphy.com/v1/gifs/trending';

const setTrendingBtn = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		previousBtn.src = 'assets/button-slider-left-md-noct.svg';
		nextBtn.src = 'assets/button-slider-right-md-noct.svg';
	} else {
		previousBtn.src = 'assets/button-slider-left.svg';
		nextBtn.src = 'assets/Button-Slider-right.svg';
	}
};

previousBtn.addEventListener('mouseover', () => {
	previousBtn.src = 'assets/button-slider-left-hover.svg';
});

nextBtn.addEventListener('mouseover', () => {
	nextBtn.src = 'assets/Button-Slider-right-hover.svg';
});

previousBtn.addEventListener('mouseout', setTrendingBtn);
nextBtn.addEventListener('mouseout', setTrendingBtn);

const getTrendingTags = async () => {
	 fetch(`${trendingTagsEndpoint}?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((trendingTags) => {
			displayTrendingTags(trendingTags);
		})
		.catch((err) => console.error(err));
};

getTrendingTags();

const displayTrendingTags = (trendingTags) => {
	for (let i = 0; i < 5; i++) {
		const trendingTagItem = document.createElement('span');
		trendingTagItem.classList.add('trending_item');
		trendingTagItem.setAttribute('onclick', `getSearch("${trendingTags.data[i]}")`);
		trendingTagItem.innerHTML = `${trendingTags.data[i]}`;
		trendingTagList.appendChild(trendingTagItem);
	}
};

const getTrendingGif = async () => {
	 fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((results) => {
			displayTrendingGifs(results);
		})
		.catch((err) => console.error(err));
};

getTrendingGif();

const displayTrendingGifs = (results) => {
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
		</div>`;
		trendingSlider.appendChild(gifContainer);
	}
};

const prevSliderBtn = () => {
	trendingSlider.scrollLeft -= 200;
};

const nextSliderBtn = () => {
	trendingSlider.scrollLeft += 200;
};


nextBtn.addEventListener('click', nextSliderBtn);
previousBtn.addEventListener('click', prevSliderBtn);

