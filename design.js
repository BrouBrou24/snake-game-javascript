const SQ = 30
const ROW = 12
const COLUMN = COL = 12
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
    this.x = 0;
    this.y = 5;
    this.color = "green";
    this.body = [[this.x, this.y]];
    this.size = 1;
    this.move = "right"
}

let colBody = [
]
Snake.prototype.moveBody = function(x, y) {
    this.x = x;
    this.y = y;
    this.body.unshift([x, y]);
    colBody.unshift([x, y]);
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
    let newX = this.x -= 1;
    if (this.collision(newX, this.y)) {
        window.stop();
    }
    this.moveBody(newX, this.y)
    if (this.eatFood(newX, this.y)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        colBody.pop();
        this.body.pop();
    }
}

Snake.prototype.moveRight = function() {
    let newX = this.x += 1;
    if (this.collision(newX, this.y)) {
        window.stop();
    }
    this.moveBody(newX, this.y)
    if (this.eatFood(newX, this.y)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        colBody.pop();
        this.body.pop();
    }
}

Snake.prototype.moveUp = function() {
    newY = this.y -= 1;
    if (this.collision(this.x, newY)) {
        window.stop();
    }
    this.moveBody(this.x, newY)
    if (this.eatFood(this.x, newY)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        colBody.pop();
        this.body.pop();
    }
}

Snake.prototype.moveDown = function() {
    newY = this.y += 1;
    if (this.collision(this.x, newY)) {
        window.stop();
    }
    this.moveBody(this.x, newY)
    if (this.eatFood(this.x, newY)) {
        this.size += 1;
    }
    else {
        this.unDraw();
        colBody.pop();
        this.body.pop();
    }
}

Snake.prototype.collision = function(newX, newY) {
    if (this.x < 0 || this.x >= COL|| this.y < 0 || this.y >= ROW) {
        alert("Game Over");
        gameOver = true;
        return true;
    }
    for (p=0; p<colBody.length; p++) {
        if (JSON.stringify(colBody[p]) == JSON.stringify([newX, newY])) {
            alert("Game Over");
            gameOver = true;
            return true;
        }
    }
}

Snake.prototype.eatFood = function(x, y) {
    if (JSON.stringify([x, y]) == JSON.stringify(food)) {
        food = newFood();
        return true;
    }
    else {
        return false;
    }
}

let snake = new Snake();
snake.draw();
let food = newFood();


function newFood() {
    let freeSquares = []
    for (r=0; r<ROW; r++) {
        for (c=0; c<COL; c++) {
            let newCoord = [r, c]
            freeSquares.push(newCoord);
            for (i=0; i<snake.body.length; i++) {
                if (JSON.stringify(newCoord) == JSON.stringify(snake.body[i])) {
                    freeSquares.pop(newCoord);
                }
            }
        }
    }
    let randomN = Math.floor(Math.random() * freeSquares.length);
    drawSquare(freeSquares[randomN][0], freeSquares[randomN][1], FOOD);
    return freeSquares[randomN];
}

let keepMoving = Date.now();

document.addEventListener('keydown', function() {
    if (event.keyCode == 37) {
        snake.move = "left";
    }
    else if (event.keyCode == 38) {
        snake.move = "up";
    }
    else if (event.keyCode == 39) {
        snake.move = "right";
    }
    else if (event.keyCode == 40) {
        snake.move = "down";
    }
})

let gameOver = false;

function sliding() {
    let now = Date.now();
    let delta = now - keepMoving;
    if (delta > 150) {
        if (snake.move == "left") {
            snake.moveLeft();
        } else if (snake.move == "right") {
            snake.moveRight();
        } else if (snake.move == "up") {
            snake.moveUp();
        } else if (snake.move == "down") {
            snake.moveDown();
        }
        keepMoving = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(sliding);
    }
}

sliding();
