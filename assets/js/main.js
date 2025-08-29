// List of songs
const songs = [
  "assets/audio/music/song1.mp3",
  "assets/audio/music/song2.mp3",
  "assets/audio/music/song3.mp3",
  "assets/audio/music/song4.mp3",
];

let currentSongIndex = Math.floor(Math.random() * songs.length);

// Function to play next song randomly
function playNextSong() {
  const audio = new Audio(songs[currentSongIndex]);
  audio.loop = false;
  audio.volume = 0.4;

  audio.addEventListener("ended", () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playNextSong();
  });

  audio.play();
}

// Function triggered when user clicks to enter
function userHasClicked() {
  const intro = document.getElementById("flexboxcontainer");
  const main = document.getElementById("hiddencontainer");

  intro.style.display = "none";
  intro.style.width = 0;
  intro.style.height = 0;

  main.style.display = "flex";
  main.style.opacity = 0;
  playNextSong();
  setTimeout(() => {
    main.style.opacity = 1;
  }, 50);
}

// Flicker effect update
function updateFlicker() {
  const randomOpacity = Math.random() * 0.75 + 0.75;
  document.querySelectorAll(".flickertext").forEach((element) => {
    element.style.setProperty("--rand", randomOpacity);
  });
}

setInterval(updateFlicker, 500);

// Add event listener for click-to-enter
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("flexboxcontainer")
    .addEventListener("click", userHasClicked);
});
