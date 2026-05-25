
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

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      sudokuEl.classList.remove("active");
      document.getElementById("sudokuResult").innerText = "TIME EXPIRED";
    }
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

  audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;

    const active = subs
      .filter(s => current >= s.t)
      .slice(-1)[0];

    box.innerText = active ? active.text : "";
  });

  const startingGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solutionGrid = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
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
      correct = false;
    }
  });

  document.getElementById("sudokuResult").innerText =
    correct ? "ACCESS GRANTED" : "SEQUENCE INCORRECT";

    if (correct) {
  clearInterval(timerInterval);
}
});



renderSudoku();