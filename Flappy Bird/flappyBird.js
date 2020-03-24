var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Media Variables

var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

var flySound = new Audio();
var scoreSound = new Audio();

// Other Variables

var gap = 85;
var constant;

var birdX = 10;
var birdY = 150;

var gravity = 1;
var thrust = 40;

var score = 0;

// Loading Media Files

function loadMedia() {
    loadImages();
    loadAudios();
}

function loadImages() {
    bird.src = "images/bird.png";
    background.src = "images/bg.png";
    foreground.src = "images/fg.png";
    pipeNorth.src = "images/pipeNorth.png";
    pipeSouth.src = "images/pipeSouth.png";
}

function loadAudios() {
    flySound.src = "sounds/fly.mp3";
    scoreSound.src = "sounds/score.mp3";
}

// Pipe Coordinates

var pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Drawing Everything

function drawEverything() {
    drawBackground();
    gravityOnBird();

    for (var i = 0; i < pipe.length; i++) {

        drawPipes(i);

        movePipes(i);

        generateNewPipes(i);

        handleCollision(i);
        updateScore(i);
    }

    drawForeground();
    drawBird();

    showScore();
}

// Drawing Background
function drawBackground() {
    context.drawImage(background, 0, 0);
}

// Gravity On Bird
function gravityOnBird() {
    birdY += gravity;
}

// Drawing Pipes
function drawPipes(i) {
    constant = pipeNorth.height + gap;
    context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
}

// Moving Pipes
function movePipes(i) {
    pipe[i].x--;
}

// Generating New Pipes
function generateNewPipes(i) {
    if (pipe[i].x == 125) {
        pipe.push({
            x: canvas.width,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
    }
}

// Handling Collision
function handleCollision(i) {
    if (birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constant) || birdY + bird.height >= canvas.height - foreground.height) {
        location.reload(); // reloading the page
    }
}

// Updating Score
function updateScore(i) {
    if (pipe[i].x == 5) {
        score++;
        scoreSound.play();
    }
}

// Drawing Foreground
function drawForeground() {
    context.drawImage(foreground, 0, canvas.height - foreground.height);
}

// Drawing Bird
function drawBird() {
    context.drawImage(bird, birdX, birdY);
}

// Showing Score
function showScore() {
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);
}

// On Press
document.addEventListener("keydown", onPress);

function onPress() {
    birdY -= thrust;
    flySound.play();
}


// Play The Game

function play() {
    drawEverything();
    requestAnimationFrame(play);
}

loadMedia();
play();
