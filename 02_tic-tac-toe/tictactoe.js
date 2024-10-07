const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размеры поля

const gridSize = 3;
const tileSize = canvas.width / gridSize;

// Игровое поле (массив 3x3)
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

// Текущий игрок ('X' или 'O')
let currentPlayer = 'X';

// Состояние игры
let gameOver = false;

// Рисуем сетку
function drawGrid() {
    ctx.lineWidth = 5;
    for (let i = 1; i < gridSize; i++) {
        // Вертикальные линии
        ctx.beginPath();
        ctx.moveTo(i * tileSize, 0);
        ctx.lineTo(i * tileSize, canvas.height);
        ctx.stroke();

        // Горизонтальные линии
        ctx.beginPath();
        ctx.moveTo(0, i * tileSize);
        ctx.lineTo(canvas.width, i * tileSize);
        ctx.stroke();
    }
}

// Рисуем крестик или нолик
function drawMark(x, y, player) {
    const padding = 20;
    const startX = x * tileSize + padding;
    const startY = y * tileSize + padding;
    const endX = (x + 1) * tileSize - padding;
    const endY = (y + 1) * tileSize - padding;

    ctx.lineWidth = 5;

    if (player === 'X') {
        // Крестик
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.moveTo(startX, endY);
        ctx.lineTo(endX, startY);
        ctx.stroke();
    } else if (player === 'O') {
        // Нолик
        ctx.beginPath();
        ctx.arc(
            x * tileSize + tileSize / 2,
            y * tileSize + tileSize / 2,
            tileSize / 2 - padding,
            0,
            Math.PI * 2
        );
        ctx.stroke();
    }
}

// Обработка кликов мыши
canvas.addEventListener('click', (event) => {
    if (gameOver) return;

    // Получаем координаты клика
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Определяем, на какую клетку нажали
    const gridX = Math.floor(clickX / tileSize);
    const gridY = Math.floor(clickY / tileSize);

    // Если клетка уже занята, ничего не делаем
    if (board[gridY][gridX] !== '') {
        return;
    }

    // Обновляем игровое поле
    board[gridY][gridX] = currentPlayer;
    drawMark(gridX, gridY, currentPlayer);

    // Проверяем, есть ли победитель
    if (checkWinner()) {
        alert(`${currentPlayer} победил!`);
        gameOver = true;
        return;
    }

    // Меняем игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
});

// Проверка победителя
function checkWinner() {
    // Проверка строк, столбцов и диагоналей
    for (let i = 0; i < gridSize; i++) {
        if (
            board[i][0] === currentPlayer &&
            board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer
        ) {
            return true;
        }
        if (
            board[0][i] === currentPlayer &&
            board[1][i] === currentPlayer &&
            board[2][i] === currentPlayer
        ) {
            return true;
        }
    }

    if (
        board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer
    ) {
        return true;
    }

    if (
        board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer
    ) {
        return true;
    }

    return false;
}

// Инициализация игры
function init() {
    drawGrid();
}

init();