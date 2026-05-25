document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");

  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const restartBtn = document.getElementById("restartBtn");

  startBtn.addEventListener("click", () => {
    audio.play();
  });

  stopBtn.addEventListener("click", () => {
    audio.pause();
  });

  restartBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
  });
  
});