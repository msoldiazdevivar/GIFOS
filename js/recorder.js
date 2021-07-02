btnRecord.style.display = 'none';
btnStopRecord.style.display = 'none';
btnUploadMyGifo.style.display = 'none';
uploading.style.display = 'none';

const apiKey = 'zUVN2rsydFUKdWsLF1vTMsmYLF4tLGDg';
const uploadGifEndpoint = 'https://upload.giphy.com/v1/gifs';

let recorder;
let blob;
let form = new FormData();
let myGifosArray = [];

let timer;
let hours = '00';
let minutes = '00';
let seconds = '00';

const getStreamAndRecord = async () => {
	createMyGifoTitle.innerHTML = `¿Nos das acceso a tu cámara?`;
	createMyGifoText.innerHTML = `El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.`;
	createMyGifoText.style.fontSize = '12px';
	buttonComenzar.style.visibility = 'hidden';
	step1.classList.add('step-active');

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((mediaStreamObj) => {
			createMyGifoTitle.classList.add('hidden');
			createMyGifoText.classList.add('hidden');
			step1.classList.remove('step-active');
			step2.classList.add('step-active');
			buttonComenzar.style.display = 'none';
			btnRecord.style.display = 'block';
			video.classList.remove('hidden');
			video.srcObject = mediaStreamObj;
			video.play();

			recorder = RecordRTC(mediaStreamObj, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
				}
			});
		})
		.catch((err) => console.error(err));
};

buttonComenzar.addEventListener('click', getStreamAndRecord);

const createGif = () => {
	btnRecord.style.display = 'none';
	btnStopRecord.style.display = 'block';
	timer.classList.remove('hidden');
	repeatBtn.classList.add('hidden');
	recorder.startRecording();
	timer = setInterval(timerActive, 1000);
};

btnRecord.addEventListener('click', createGif);

const stopCreatingGif = () => {
	video.classList.add('hidden');
	recordedGifo.classList.remove('hidden');
	recorder.stopRecording(() => {
		blob = recorder.getBlob();
		recordedGifo.src = URL.createObjectURL(blob);
		form.append('file', recorder.getBlob(), 'myGif.gif');
	});

	btnStopRecord.style.display = 'none';
	btnUploadMyGifo.style.display = 'block';
	timer.classList.add('hidden');
	repeatBtn.classList.remove('hidden');

	clearInterval(timer);
	hours = '00';
	minutes = '00';
	seconds = '00';
	timer.innerText = `${hours}:${minutes}:${seconds}`;
};

btnStopRecord.addEventListener('click', stopCreatingGif);


const uploeadCreatedGif = async () => {
	uploading.style.display = 'flex';
	step2.classList.remove('step-active');
	step3.classList.add('step-active');
	repeatBtn.classList.add('hidden');
	btnUploadMyGifo.style.visibility = 'hidden';

	fetch(`${uploadGifEndpoint}?api_key=${apiKey}`, {
		method: 'POST',
		body: form,
	})
		.then((response) => response.json())
		.then((myGif) => {
			let myGifoId = myGif.data.id
			uploadingStatusIcon.src = 'assets/check.svg';
			uploadingStatusText.innerHTML = 'GIFO subido con éxito';

			let buttonsMyGif = document.createElement('div');
			buttonsMyGif.classList.add('uploading_buttons');
			buttonsMyGif.innerHTML = `<div class="btns downloaduploading" onclick="downloadCreatedGif('${myGifoId}')"></div> 
			<div class="btns linkuploading" onclick="displaymyGifos_section(event)"></div>`;
			uploading.appendChild(buttonsMyGif);
			myGifosArray.push(myGifoId);
			myGifos = localStorage.setItem('MyGifs', JSON.stringify(myGifosArray));
		})
		.catch((err) => {
			console.error(err);
		});
};

btnUploadMyGifo.addEventListener('click', uploeadCreatedGif);

const repeatRecordingGif = (event) => {
	event.preventDefault();
	recorder.clearRecordedData();
	step2.classList.add('step-active');
	repeatBtn.classList.add('hidden');
	btnRecord.style.display = 'block';
	btnUploadMyGifo.style.display = 'none';
	video.classList.remove('hidden');
	recordedGifo.classList.add('hidden');

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((mediaStreamObj) => {
			video.srcObject = mediaStreamObj;
			video.play();

			recorder = RecordRTC(mediaStreamObj, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
				}
			});
		})
		.catch((err) => console.error(err));
};
repeatBtn.addEventListener('click', repeatRecordingGif);

const downloadCreatedGif = async (myGifId) => {
	let blob = await fetch(`https://media.giphy.com/media/${myGifId}/giphy.gif`)
	.then((img) => img.blob());
	invokeSaveAsDialog(blob, 'My-Gif.gif');
};

function timerActive() {
	seconds++;

	if (seconds < 10) seconds = `0` + seconds;

	if (seconds > 59) {
		seconds = `00`;
		minutes ++;

		if (minutes < 10) minutes = `0` + minutes;
	}

	if (minutes > 59) {
		minutes = `00`;
		hours++;

		if (hours < 10) hours = `0` + hours;
	}

	timer.innerHTML = `${hours}:${minutes}:${seconds}`;
}
