  const audio = document.getElementById("audio");
  const box = document.getElementById("subtitles");
const subs = [
    { t: 8, text: "?איפה יש מאצ'ה טובה" },
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
  }, 55);
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