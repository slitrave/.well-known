const bg = document.getElementById("bg-music");
const intro = document.getElementById("flexboxcontainer");
const main = document.getElementById("hiddencontainer");
const background = document.getElementById("background-layer");

const songs = [
  "assets/audio/song1.mp3",
  "assets/audio/song2.mp3",
  "assets/audio/song3.mp3",
  "assets/audio/song4.mp3"
];

let lastSong = null;

// Pick a random song different from the last
function pickRandomSong() {
  let nextSong;
  do {
    nextSong = songs[Math.floor(Math.random() * songs.length)];
  } while (nextSong === lastSong && songs.length > 1);
  lastSong = nextSong;
  return nextSong;
}

// Play a song
function playSong() {
  // Check if the audio is already playing to prevent re-starting it
  if (bg.paused || bg.ended) {
    bg.volume = 0.5;
    bg.play().catch(error => {
      console.error("Autoplay was prevented:", error);
    });
  }
}

// Show main content and start music
function showMainAndPlayMusic() {
  // Fade out intro
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    // Show main content
    background.style.opacity = "1";
    main.style.display = "flex";
    setTimeout(() => {
      main.style.opacity = "1";
    }, 50);
    // Start music after the transition
    bg.src = pickRandomSong();
    playSong();
  }, 500); // Wait for the fade-out transition
}

// Handle the user's first click on the intro screen
intro.addEventListener("click", function firstClick() {
  showMainAndPlayMusic();
  // Remove the event listener to ensure it only runs once
  intro.removeEventListener("click", firstClick);
});

// When a song ends, pick another and play it
bg.addEventListener("ended", () => {
  bg.src = pickRandomSong();
  bg.play();
});

// Preload the first song to reduce loading time
bg.src = pickRandomSong();