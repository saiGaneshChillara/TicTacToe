const ticTacToeContainer = document.getElementById("tic-tac-toe-container");
const winningStatus = document.getElementById("winning-status");
const replayButton = document.getElementById("replay-button");
const currentTurn = document.getElementById('current-player-status');
const drawStatus = document.getElementById('draw-status');

let board = Array(9).fill(null);
let currentPlayer = "X";
let win = false;

currentTurn.innerText = `Current turn of: ${currentPlayer}`;

const replay = () => {
    replayButton.classList.add("hidden");
    winningStatus.classList.add('hidden');
    drawStatus.classList.add('hidden');

    board = Array(9).fill(null);
    currentPlayer = "X";
    currentTurn.innerText = `Current turn of: ${currentPlayer}`;
    win = false;
    ticTacToeContainer.innerHTML = "<h1>This is tic tac toe</h1>";
    const r1 = createRow(1, 3, handleSquareClick);
    const r2 = createRow(4, 6, handleSquareClick);
    const r3 = createRow(7, 9, handleSquareClick);
    ticTacToeContainer.appendChild(r1);
    ticTacToeContainer.appendChild(r2);
    ticTacToeContainer.appendChild(r3);

};

const setBoard = (newBoard) => {
    board = newBoard;
};

const isBoardFull = (board) => {
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            return false;
        }
    }
    return true;
};

const setCurentPlayer = (newPlayer) => {
    currentPlayer = newPlayer;
};

const togglePlayer = () => {
    setCurentPlayer(currentPlayer === "X" ? "O" : "X");
    currentTurn.innerText = `Current turn of: ${currentPlayer}`;
};

const createSquare = (value, key, clickHandler) => {
    const newButton = document.createElement("button");
    newButton.classList.add("square");
    newButton.id = key;
    newButton.onclick = clickHandler;
    newButton.innerText = value;
    return newButton;
};

const checkWinCondition = (newBoard) => {
    const combinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];
    for (let i = 0; i < combinations.length; i++) {
        const [x, y, z] = combinations[i];
        if (
            newBoard[x] &&
            newBoard[x] === newBoard[y] &&
            newBoard[x] === newBoard[z]
        )
            return true;
    }
    return false;
};

const handleSquareClick = (index) => {
    if (win === false) {
        console.log(`Square with index ${index} is clicked`);
        const clickedSquare = document.getElementById(index);

        if (board[index] === null) {
            clickedSquare.innerText = currentPlayer;
            let newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            console.log("Board is", board);
            if (checkWinCondition(board)) {
                winningStatus.innerText = `Game won by: ${currentPlayer}`;
                winningStatus.classList.remove("hidden");
                win = true;
                replayButton.classList.remove('hidden');
                replayButton.onclick = replay;
                currentTurn.classList.add('hidden');
                return;
            }

            if (isBoardFull(board)) {
                drawStatus.classList.remove('hidden');
                currentTurn.classList.add('hidden');
                replayButton.classList.remove('hidden');
                replayButton.onclick = replay;
            }

            togglePlayer();
        }
    }
};

const createRow = (start, end, handleClick) => {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = start - 1; i < end; i++) {
        const square = createSquare("", i, () => handleClick(i));
        row.appendChild(square);
    }
    return row;
};
const r1 = createRow(1, 3, handleSquareClick);
const r2 = createRow(4, 6, handleSquareClick);
const r3 = createRow(7, 9, handleSquareClick);
ticTacToeContainer.appendChild(r1);
ticTacToeContainer.appendChild(r2);
ticTacToeContainer.appendChild(r3);
