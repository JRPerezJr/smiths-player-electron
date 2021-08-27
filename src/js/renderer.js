const headTitle = document.getElementById('head');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Check if playing
let isPlaying = false;

// Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

// Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = song => {
  headTitle.textContent = `The Smiths Music Player | ${song.displayName}`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.album}/${song.fileName}.mp3`;
  image.src = `img/${song.albumCover}.jpg`;
};

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = window.playerData.songs.length - 1;
  }
  loadSong(window.playerData.songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > window.playerData.songs.length - 1) {
    songIndex = 0;
  }
  loadSong(window.playerData.songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(window.playerData.songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = e => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switch duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
const setProgressBar = e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
