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
    this.body = [[this.x, this.y]];
    this.size = 1;
    this.food = newFood();
}

Snake.prototype.moveBody = function(x, y) {
    this.x = x;
    this.y = y;
    this.body.unshift([x, y]);
    this.draw();
}

Snake.prototype.draw = function() {
    for (l=0; l<this.size; l++){
        drawSquare(this.body[l][0], this.body[l][1], this.color);
    }
}

Snake.prototype.unDraw = function() {
    let lastPosition = this.body[this.body.length-1];
    drawSquare(lastPosition[0], lastPosition[1], EMPTY);
}

Snake.prototype.moveLeft = function() {
    if (this.outOfBounds()) {
        window.stop();
    }
    let newX = this.x -= 1;
    if (this.eatFood(newX, this.y)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        this.body.pop();
    }
    this.moveBody(newX, this.y)
}

Snake.prototype.moveRight = function() {
    if (this.outOfBounds()) {
        window.stop();
    }
    let newX = this.x += 1;
    if (this.eatFood(newX, this.y)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        this.body.pop();
    }
    this.moveBody(newX, this.y)
}

Snake.prototype.moveUp = function() {
    if (this.outOfBounds()) {
        window.stop();
    }
    newY = this.y -= 1;
    if (this.eatFood(this.x, newY)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        this.body.pop();
    }
    this.moveBody(this.x, newY)
}

Snake.prototype.moveDown = function() {
    if (this.outOfBounds()) {
        window.stop();
    }
    newY = this.y += 1;
    if (this.eatFood(this.x, newY)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        this.body.pop();
    }
    this.moveBody(this.x, newY)
}

Snake.prototype.outOfBounds = function() {
    if (this.x < 0 || this.x >= ROW || this.y < 0 || this.y >= COL) {
        alert("Game Over");
    }
}

Snake.prototype.eatFood = function(x, y) {
    if (JSON.stringify([x, y]) == JSON.stringify(this.food)) {
        this.food = newFood();
        return true;
    }
    else {
        return false;
    }
}


 function newFood() {
    x = Math.floor(Math.random() * board.length);
    y = Math.floor(Math.random() * board.length);
    drawSquare(x, y, FOOD);
    return [x, y];
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
