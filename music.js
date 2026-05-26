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


  const audio = document.getElementById("audio");
  const box = document.getElementById("subtitles");
const subs = [
    { t: 2, text: "<3 <3 <3 <3 <3 <3 <3" },
    { t: 6, text: "לכל דבר בעולם יש את המקום שלו" },

  ];

 let currentSubtitleIndex = -1;
let typingInterval = null;

function typeSubtitle(text) {
  clearInterval(typingInterval);
  box.textContent = "";

  let i = 0;

  typingInterval = setInterval(() => {
    box.textContent = text.slice(0, i + 1);
    i++;

    if (i >= text.length) {
      clearInterval(typingInterval);
    }
  }, 70);
}

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;

  const activeIndex = subs.findIndex((sub, index) => {
    const next = subs[index + 1];
    return current >= sub.t && (!next || current < next.t);
  });

  if (activeIndex !== -1 && activeIndex !== currentSubtitleIndex) {
    currentSubtitleIndex = activeIndex;
    typeSubtitle(subs[activeIndex].text);
  }
});