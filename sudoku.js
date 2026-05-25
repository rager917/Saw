
  const audio = document.getElementById("audio");
  const box = document.getElementById("subtitles");
  let sudokuStarted = false;
let timeLeft = 5 * 60;
let timerInterval = null;

const startSudokuBtn = document.getElementById("startSudokuBtn");
const timerEl = document.getElementById("timer");
const sudokuEl = document.getElementById("sudoku");

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerEl.innerText =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

startSudokuBtn.addEventListener("click", () => {
  if (sudokuStarted) return;

  sudokuStarted = true;
  sudokuEl.classList.add("active");
  startSudokuBtn.style.display = "none";

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
  }, 1000);
});

updateTimer();

  const subs = [
    { t: 0, text: "אני לא מאמין שעשיתי את זה לעצמי" },
    { t: 2.5, text: "בלינקדאין לוקח לי 70 שנה" },
    { t: 5, text: "לפתור את הסודוקו הכי קל" },
    { t: 7, text: "אבל פה חשבתי לעצמי" },
    { t: 8, text: '"אההה כן,אתה בטוח מצליח לפתור"' },
    { t: 10, text: '"את הסודוקו תוך פחות מ5 דקות"' },
    { t: 14, text: ':( את יכולה לפתור את זה בבקשה'},
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
  const startingGrid = [
  [0, 0, 3, 0, 2, 0, 6, 0, 0],
  [9, 0, 0, 3, 0, 5, 0, 0, 1],
  [0, 0, 1, 8, 0, 6, 4, 0, 0],
  [0, 0, 8, 1, 0, 2, 9, 0, 0],
  [7, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 6, 7, 0, 8, 2, 0, 0],
  [0, 0, 2, 6, 0, 9, 5, 0, 0],
  [8, 0, 0, 2, 0, 3, 0, 0, 9],
  [0, 0, 5, 0, 1, 0, 3, 0, 0],
];

const solutionGrid = [
  [4, 8, 3, 9, 2, 1, 6, 5, 7],
  [9, 6, 7, 3, 4, 5, 8, 2, 1],
  [2, 5, 1, 8, 7, 6, 4, 9, 3],
  [5, 4, 8, 1, 3, 2, 9, 7, 6],
  [7, 2, 9, 5, 6, 4, 1, 3, 8],
  [1, 3, 6, 7, 9, 8, 2, 4, 5],
  [3, 7, 2, 6, 8, 9, 5, 1, 4],
  [8, 1, 4, 2, 5, 3, 7, 6, 9],
  [6, 9, 5, 4, 1, 7, 3, 8, 2],
];

function renderSudoku() {
  const sudoku = document.getElementById("sudoku");
  sudoku.innerHTML = "";

  startingGrid.forEach((row, r) => {
    row.forEach((value, c) => {
      const input = document.createElement("input");
      input.className = "cell";
      input.maxLength = 1;

      if (value !== 0) {
        input.value = value;
        input.disabled = true;
        input.classList.add("fixed");
      }

      input.dataset.row = r;
      input.dataset.col = c;
      sudoku.appendChild(input);
    });
  });
}

document.getElementById("checkSudokuBtn").addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  let correct = true;

  cells.forEach(cell => {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);

    if (Number(cell.value) !== solutionGrid[r][c]) {
            console.log(r, c, cell.value, solutionGrid[r][c]);
z
      correct = false;
    }
  });
if (correct) {
  clearInterval(timerInterval);
  document.getElementById("sudokuResult").innerText = "ACCESS GRANTED";

  setTimeout(() => {
    window.location.href = "lucky.html";
  }, 1500);
} else {
  document.getElementById("sudokuResult").innerText = "SEQUENCE INCORRECT";
}
    if (correct) {
  clearInterval(timerInterval);
}
});



renderSudoku();