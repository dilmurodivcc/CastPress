const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const volumeControl = document.getElementById('volume-control');
const downloadBtn = document.getElementById('download');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.querySelector('img').src = "../icons/pause-solid.svg";
    } else {
        audio.pause();
        playPauseBtn.querySelector('img').src = "../icons/play-solid.svg"; 
    }
});

function updateProgressBar() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #333 ${percentage}%, #ddd ${percentage}%)`;
}

audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    updateProgressBar();
});

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
    updateProgressBar();
});

volumeControl.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeControl.querySelector('img').src = audio.muted
        ? "../icons/volume-xmark-solid.svg" 
        : "../icons/volume-high-solid.svg";
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = audio.src;
    link.download = '../music/Sabrina Carpenter - Espresso.mp3';
    link.click();
});
