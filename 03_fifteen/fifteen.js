const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размер поля 4x4 (15 плиток)
const gridSize = 4;
const tileSize = canvas.width / gridSize;

// Игровое поле: массив плиток (0 - пустая клетка)
let board = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };

// Инициализация игрового поля
function initBoard() {
    let numbers = [];
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        numbers.push(i + 1);
    }
    numbers.push(0); // Пустая плитка (обозначим ее нулем)

    // Перемешиваем числа
    numbers = shuffle(numbers);

    // Заполняем игровое поле
    for (let y = 0; y < gridSize; y++) {
        board[y] = [];
        for (let x = 0; x < gridSize; x++) {
            board[y][x] = numbers[y * gridSize + x];
            if (board[y][x] === 0) {
                emptyTile.x = x;
                emptyTile.y = y;
            }
        }
    }

    drawBoard();
}

// Перемешивание массива чисел
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Рисуем игровое поле
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (board[y][x] !== 0) {
                drawTile(x, y, board[y][x]);
            }
        }
    }
}

// Рисуем плитку
function drawTile(x, y, number) {
    ctx.fillStyle = '#3498db';
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
}

// Проверяем возможность перемещения плитки
function canMove(x, y) {
    return (
        (Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) ||
        (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x)
    );
}

// Меняем местами плитку и пустую клетку
function moveTile(x, y) {
    if (canMove(x, y)) {
        board[emptyTile.y][emptyTile.x] = board[y][x];
        board[y][x] = 0;
        emptyTile.x = x;
        emptyTile.y = y;
        drawBoard();

        // Проверка на победу
        if (checkWin()) {
            setTimeout(() => alert('Победа!'), 100);
        }
    }
}

// Проверка на выигрыш
function checkWin() {
    let count = 1;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (y === gridSize - 1 && x === gridSize - 1) return true; // Последняя клетка (пустая) всегда на месте
            if (board[y][x] !== count++) {
                return false;
            }
        }
    }
    return true;
}

// Обработка кликов мыши
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const gridX = Math.floor(clickX / tileSize);
    const gridY = Math.floor(clickY / tileSize);

    moveTile(gridX, gridY);
});

// Инициализация игры
initBoard();