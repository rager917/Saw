

  const audio = document.getElementById("audio");
  const box = document.getElementById("subtitles");

  const subs = [
    { t: 0, text: "HELLO DD." },
    { t: 2.5, text: "I WANT TO PLAY A GAME." },
    { t: 5, text: "אין פה כלום אין פה כלום" },
    { t: 13, text: "אני כרגע בשלבים ההתחלתיים של המסור הבא" },
    { t: 18, text: "ובניתי סדרה של חידות" },
    { t: 20, text: "שאף אחד לא מצליח לפתור" },
    { t: 23, text: ":( וזה כולל אותי" },
    { t: 25, text: "זה יוצר בעיה רצינית מבחינה עלילתית" },
    { t: 27.5, text: "כי כל הדמויות מתות בפאקינג רבע שעה הראשונה של הסרט" },
    { t: 30.5, text: "תקשיבי, רק את יכולה לפתור את החידות שבניתי" },
    { t: 36, text: "ולגלות לי מה הפתרונות" },
    { t: 38, text: "!אני צריך את העזרה שלך, בבקשה" },
    { t: 40, text: "INTENSIFIES המירוץ למיליון " },
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

const sudokuBtn = document.getElementById("sudokuBtn");

sudokuBtn.addEventListener("click", () => {
  window.location.href = "sudoku.html";
});