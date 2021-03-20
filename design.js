const SQ = 20
const ROW = 15
const COLUMN = COL = 15
const EMPTY = "#FFF"
const FOOD = "red"

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
    this.size = 1;
}

Snake.prototype.draw = function(x, y) {
    drawSquare(this.x, this.y, this.color)
}

Snake.prototype.unDraw = function(x, y) {
    drawSquare(this.x, this.y, EMPTY)
}

Snake.prototype.moveLeft = function() {
    if (this.outOfBounds()) {
            window.stop();
        }
    else {
    this.unDraw();
    this.x -= 1;
    this.draw();
    }
}

Snake.prototype.moveRight = function() {
    if (this.outOfBounds()) {
            window.stop();
        }
    else {
    this.unDraw();
    this.x += 1;
    this.draw();
    }
}

Snake.prototype.moveUp = function() {
    if (this.outOfBounds()) {
            window.stop();
        }
    else {
    this.unDraw();
    this.y -= 1;
    this.draw();
    }
}

Snake.prototype.moveDown = function() {
    if (this.outOfBounds()) {
        window.stop();
    }
    else {
    this.unDraw();
    this.y += 1;
    this.draw();
    }
}

Snake.prototype.outOfBounds = function() {
    if (this.x < 1 || this.x > (ROW-2) || this.y < 1 || this.y > (COL-2)) {
        alert("Game Over");
    }
}

Snake.prototype.eatFood = function(x, y) {
    if (this.x == FOOD || this.y == FOOD) {
        this.grow();
    }
}

function newFood() {
    number1 = Math.floor(Math.random() * board.length)
    number2 = Math.floor(Math.random() * board.length)
    drawSquare(number1, number2, FOOD)
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
newFood();