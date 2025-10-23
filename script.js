// script.js

const container = document.getElementById("container");
const resetBtn = document.getElementById("reset");
const DEFAULT_SIZE = 16;

// Function to create grid
function createGrid(size) {
  container.innerHTML = ""; // clear existing grid
  const squareSize = 960 / size; // keep total width 960px

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Store darkness level for each square
    square.dataset.darkness = 0;

    // Hover event
    square.addEventListener("mouseover", () => {
      applyColor(square);
    });

    container.appendChild(square);
  }
}

// Apply color with random RGB + darken effect
function applyColor(square) {
  let darkness = Number(square.dataset.darkness);
  if (darkness < 10) darkness += 1;
  square.dataset.darkness = darkness;

  // Random base RGB
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Darken by reducing brightness proportional to darkness
  const factor = 1 - darkness * 0.1;
  const darkR = Math.floor(r * factor);
  const darkG = Math.floor(g * factor);
  const darkB = Math.floor(b * factor);

  square.style.backgroundColor = `rgb(${darkR}, ${darkG}, ${darkB})`;
}

// Ask user for grid size and recreate grid
function resetGrid() {
  let newSize = parseInt(prompt("Enter new grid size (1–100):"));
  if (isNaN(newSize) || newSize < 1 || newSize > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }
  createGrid(newSize);
}

// Initialize grid
createGrid(DEFAULT_SIZE);

// Button event listener
resetBtn.addEventListener("click", resetGrid);
