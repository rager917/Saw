function generateFiveNumbersThatSumTo27() {
  const nums = [];
  let remaining = 27;

  for (let i = 0; i < 4; i++) {
    const max = remaining - (4 - i); // leave at least 1 for each remaining number
    const n = Math.floor(Math.random() * max) + 1;
    nums.push(n);
    remaining -= n;
  }

  nums.push(remaining);

  return nums.sort(() => Math.random() - 0.5);
}
const leverSound = document.getElementById("leverSound");
  const audio = document.getElementById("audio");
  const box = document.getElementById("subtitles");
const subs = [
    { t: 0, text: "בלבולי שכל" },
        { t: 9, text: "התוצאה של החידה היא מספר" },
   { t: 18, text: "לעולם לא נצליח לנצח לבד" },
      { t: 21, text: "אנחנו חייבים להיות ביחד" },
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


document.addEventListener("DOMContentLoaded", () => {
  const slots = [
    document.getElementById("n1"),
    document.getElementById("n2"),
    document.getElementById("n3"),
    document.getElementById("n4"),
    document.getElementById("n5"),
  ];

  const btn = document.getElementById("pullLeverBtn");
  const sumText = document.getElementById("sumText");

btn.addEventListener("click", () => {

  leverSound.currentTime = 0;
  leverSound.play();

  btn.disabled = true;

  let spinCount = 0;

  const spinAnimation = setInterval(() => {
    slots.forEach(slot => {
      slot.innerText = Math.floor(Math.random() * 9) + 1;
    });

    spinCount++;

    if (spinCount >= 15) {
      clearInterval(spinAnimation);

      const nums = generateFiveNumbersThatSumTo27();

      nums.forEach((num, i) => {
        slots[i].innerText = num;
      });


      btn.disabled = false;
    }
  }, 100);
});
});



const luckyAnswer = document.getElementById("luckyAnswer");
const submitLuckyBtn = document.getElementById("submitLuckyBtn");
const luckyResult = document.getElementById("luckyResult");

submitLuckyBtn.addEventListener("click", () => {
  if (Number(luckyAnswer.value) === 27) {
    luckyResult.innerText = "ACCESS GRANTED";

    setTimeout(() => {
      window.location.href = "music.html";
    }, 1200);
  } else {
    luckyResult.innerText = "INCORRECT. TRY AGAIN.";
  }
});

