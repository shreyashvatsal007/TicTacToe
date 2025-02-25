const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

function checkWinner() {
    for (let condition of winningCombinations) {
        let [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `Player ${gameBoard[a]} Wins! 🎉`;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 🤝";
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
