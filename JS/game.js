const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-value');

canvas.width = 800;
canvas.height = 600;

class Car {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.speed;
    }
}

const player = new Car(canvas.width / 2 - 25, canvas.height - 100, 50, 80, 5, 'red');

const road = {
    y: 0,
    speed: 5
};

const opponents = [
    new Car(Math.random() * (canvas.width - 50), -100, 50, 80, 3, 'blue'),
    new Car(Math.random() * (canvas.width - 50), -300, 50, 80, 4, 'blue')
];

let score = 0;
let gameLoop;
let keys = {};

function drawRoad() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    for (let i = road.y % 40; i < canvas.height; i += 40) {
        ctx.fillRect(canvas.width / 2 - 5, i, 10, 20);
    }
}

function moveRoad() {
    road.y += road.speed;
    if (road.y >= 40) {
        road.y = 0;
    }
}

function movePlayer() {
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function moveOpponents() {
    opponents.forEach(opponent => {
        opponent.move();
        if (opponent.y > canvas.height) {
            opponent.y = -opponent.height;
            opponent.x = Math.random() * (canvas.width - opponent.width);
            score++;
            scoreElement.textContent = score;
        }
    });
}

function checkCollisions() {
    opponents.forEach(opponent => {
        if (checkCollision(player, opponent)) {
            console.log('Game over');
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    });
}

function checkCollision(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y);
}

function resetGame() {
    player.x = canvas.width / 2 - 25;
    score = 0;
    scoreElement.textContent = score;
    opponents.forEach(opponent => {
        opponent.y = -opponent.height;
        opponent.x = Math.random() * (canvas.width - opponent.width);
    });
}

function gameLoopFunction() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    player.draw();
    opponents.forEach(opponent => opponent.draw());
    moveRoad();
    movePlayer ();
    moveOpponents();
    checkCollisions();
    requestAnimationFrame(gameLoopFunction);
}

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

gameLoop = gameLoopFunction;
gameLoop();