// Elementlarni tanlab olish
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const volumeControl = document.getElementById('volume-control');
const downloadBtn = document.getElementById('download');

// Vaqt formatlash funksiyasi (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Audio yuklanganda umumiy vaqtni yangilash
audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// Play/Pause tugmasi uchun funksiyalar
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.querySelector('img').src = "../icons/pause-solid.svg"; // Pause icon URL qo'shing
    } else {
        audio.pause();
        playPauseBtn.querySelector('img').src = "../icons/play-solid.svg"; // Play icon URL qo'shing
    }
});

// Progress bar fonini yangilaydigan funksiya
function updateProgressBar() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #333 ${percentage}%, #ddd ${percentage}%)`;
}

// Audio o'ynaganda progress bar va vaqtni yangilash
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    updateProgressBar();
});

// Foydalanuvchi progress barni o'zgartirganda audio vaqtini yangilash
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
    updateProgressBar();
});

// Ovoz nazoratini boshqarish (mute/unmute)
volumeControl.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeControl.querySelector('img').src = audio.muted
        ? "../icons/volume-xmark-solid.svg" // Mute icon URL qo'shing
        : "../icons/volume-high-solid.svg"; // Volume icon URL qo'shing
});

// Yuklab olish tugmasi
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = audio.src;
    link.download = '../music/Sabrina Carpenter - Espresso.mp3';
    link.click();
});
