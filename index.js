const btn = document.getElementById("startBtn");
const audio = document.getElementById("audio");

btn.addEventListener("click", () => {
  audio.play();
});