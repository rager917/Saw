const correctMusicCode = "280599";

document.getElementById("checkMusicBtn").addEventListener("click", () => {
  const digits = [...document.querySelectorAll(".code-digit")]
    .map(input => input.value)
    .join("");

  if (digits === correctMusicCode) {
    document.getElementById("musicResult").innerText = "ACCESS GRANTED";

    setTimeout(() => {
      window.location.href = "break_time.html";
    }, 1200);
  } else {
    document.getElementById("musicResult").innerText = "INDEX CORRUPTED";
  }
});

document.querySelectorAll(".track-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const audioId = btn.dataset.audio;
    const audio = document.getElementById(audioId);

    document.querySelectorAll("audio").forEach(a => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0;
      }
    });

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

  });
});