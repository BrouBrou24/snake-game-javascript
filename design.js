SQ = 20
ROW = 15
COLUMN = COL = 15
EMPTY = "#FFF"

let board = []
for (r=0; r<ROW; r++) {
    board[r] = []
    for (c=0; c<COL; c++) {
        board[r][c] = EMPTY;
    }
}

const cvs = document.getElementById("grid");
const ctx = cvs.getContext("2d");

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

function drawBoard() {
    for (r=0; r<ROW; r++) {
        for (c=0; c<COL; c++) {
            drawSquare(c, r, board[r][c])
        }
    }
}

drawBoard();

function Snake() {
    this.x = 7;
    this.y = 7;
    this.color = "green";
}

Snake.prototype.draw = function(x, y) {
    drawSquare(this.x, this.y, this.color)
}

Snake.prototype.unDraw = function(x, y) {
    drawSquare(this.x, this.y, EMPTY)
}

Snake.prototype.moveLeft = function() {
    this.unDraw();
    this.x -= 1;
    this.draw();
}

Snake.prototype.moveRight = function() {
    this.unDraw();
    this.x += 1;
    this.draw();
}

Snake.prototype.moveUp = function() {
    this.unDraw();
    this.y -= 1;
    this.draw();
}

Snake.prototype.moveDown = function() {
    this.unDraw();
    this.y += 1;
    this.draw();
}

document.addEventListener('keydown', function() {
    if (event.keyCode == 37) {
        snake.moveLeft();
    }
    else if (event.keyCode == 38) {
        snake.moveUp();
    }
    else if (event.keyCode == 39) {
        snake.moveRight();
    }
    else if (event.keyCode == 40) {
        snake.moveDown();
    }
})

let snake = new Snake();
snake.draw();