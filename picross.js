const solution = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0, 0, 0, 0],

[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0, 0, 0,  1, 1, 0, 0],

[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0],
[0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1, 1, 1, 0, 0, 0, 0],

[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ,1,  0, 0, 0, 0 ],

[0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0 ,0,  0, 0, 0, 0],

[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,  0, 0, 0, 0],

[0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0, 0, 0, 0],
];
function cluesForLine(line) {
  const clues = [];
  let count = 0;

  line.forEach(cell => {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  });

  if (count > 0) clues.push(count);
  return clues.length ? clues : [0];
}

function renderPicross() {
  const root = document.getElementById("picross");
  root.innerHTML = "";

  const rows = solution.length;
  const cols = solution[0].length;

  const CELL = 34;
const LEFT_CLUE = 110;
const TOP_CLUE = 120;

root.style.gridTemplateColumns = `${LEFT_CLUE}px repeat(${cols}, ${CELL}px)`;
root.style.gridTemplateRows = `${TOP_CLUE}px repeat(${rows}, ${CELL}px)`;
  const rowClues = solution.map(row => cluesForLine(row));

  const colClues = Array.from({ length: cols }, (_, c) =>
    cluesForLine(solution.map(row => row[c]))
  );

  const corner = document.createElement("div");
  corner.className = "corner";
  root.appendChild(corner);

  colClues.forEach(clue => {
    const div = document.createElement("div");
    div.className = "clue top-clue";
    div.innerHTML = clue.join("<br>");
    root.appendChild(div);
  });

  for (let r = 0; r < rows; r++) {
    const left = document.createElement("div");
    left.className = "clue left-clue";
    left.textContent = rowClues[r].join(" ");
    root.appendChild(left);

    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "picross-cell";
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener("click", () => {
        cell.classList.toggle("filled");
      });

      root.appendChild(cell);
    }
  }
}

document.getElementById("checkPicrossBtn").addEventListener("click", () => {
  let correct = true;

  document.querySelectorAll(".picross-cell").forEach(cell => {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);
    const filled = cell.classList.contains("filled") ? 1 : 0;

    if (filled !== solution[r][c]) {
      correct = false;
    }
  });

  if (correct) {
  picrossResult.style.display = "block";
  picrossResult.textContent = "YES, I'M A HIPPO! GO TO THE CLOSEST HIPPO!";
} else {
  document.getElementById("picrossResult").innerText = "IMAGE CORRUPTED";
}
});

const devMode = new URLSearchParams(window.location.search).get("dev") === "true";
console.log(devMode);
if (devMode) {
  document.getElementById("revealPicrossBtn").style.display = "block";
}

document.getElementById("revealPicrossBtn").addEventListener("click", () => {
  document.querySelectorAll(".picross-cell").forEach(cell => {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);

    if (solution[r][c] === 1) {
      cell.classList.add("filled");
    } else {
      cell.classList.remove("filled");
    }
  });
});


renderPicross();