const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размер поля 4x4
const gridSize = 4;
const tileSize = canvas.width / gridSize;

// Игровое поле: массив плиток (0 - пустая клетка)
let board = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };

// Для перемещения плитки
let draggingTile = null;
let draggingOffsetX = 0;
let draggingOffsetY = 0;
let isDragging = false;

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
            board[y][x] = {
                number: numbers[y * gridSize + x],
                x: x,
                y: y
            };
            if (board[y][x].number === 0) {
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
            if (board[y][x].number !== 0) {
                drawTile(board[y][x].x, board[y][x].y, board[y][x].number);
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

// Обработка начала перетаскивания
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / tileSize);
    const gridY = Math.floor(mouseY / tileSize);

    // Если плитка рядом с пустой клеткой, разрешаем перетаскивание
    if (canMove(gridX, gridY)) {
        draggingTile = board[gridY][gridX];
        draggingOffsetX = mouseX - draggingTile.x * tileSize;
        draggingOffsetY = mouseY - draggingTile.y * tileSize;
        isDragging = true;
    }
});

// Обработка перетаскивания плитки
canvas.addEventListener('mousemove', (event) => {
    if (isDragging && draggingTile) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Перемещаем плитку за курсором с учетом смещения
        draggingTile.x = (mouseX - draggingOffsetX) / tileSize;
        draggingTile.y = (mouseY - draggingOffsetY) / tileSize;

        drawBoard();
    }
});

// Обработка завершения перетаскивания
canvas.addEventListener('mouseup', () => {
    if (isDragging && draggingTile) {
        // Закрепляем плитку на ближайшую ячейку
        draggingTile.x = emptyTile.x;
        draggingTile.y = emptyTile.y;

        // Обновляем пустую клетку
        board[emptyTile.y][emptyTile.x] = draggingTile;
        board[draggingTile.y][draggingTile.x] = { number: 0, x: draggingTile.x, y: draggingTile.y };

        emptyTile.x = draggingTile.x;
        emptyTile.y = draggingTile.y;

        isDragging = false;
        draggingTile = null;

        drawBoard();

        // Проверяем на победу
        if (checkWin()) {
            setTimeout(() => alert('Победа!'), 100);
        }
    }
});

// Проверка на выигрыш
function checkWin() {
    let count = 1;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (y === gridSize - 1 && x === gridSize - 1) return true; // Последняя клетка (пустая) всегда на месте
            if (board[y][x].number !== count++) {
                return false;
            }
        }
    }
    return true;
}

// Инициализация игры
initBoard();