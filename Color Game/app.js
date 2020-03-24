var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var rgbDisplay = document.getElementById("rgbDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var header = document.querySelector("h1");
var resetBtn = document.querySelector("#resetBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setButtons();
    setSquares();
    reset();
}

function setButtons() {
    resetBtn.addEventListener("click", reset);
    setModeButtons();
}

function setModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            reset();
        });
    }
}

function setSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "CONGRATULATIONS!"
                changeColors(clickedColor);
                header.style.backgroundColor = clickedColor;
                resetBtn.textContent = "PLAY AGAIN!"
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "TRY ONE MORE TIME!";
            }
        });
    }
}

function reset() {
    resetBtn.textContent = "NEW COLORS!"
    messageDisplay.textContent = "BEST OF LUCK!";

    colors = generateRandomColors();
    pickedColor = pickColor();
    rgbDisplay.textContent = pickedColor;
    colorSquares();

    header.style.backgroundColor = "rgb(32, 175, 207)"
}

function colorSquares() {
    if (modeButtons[0].classList.contains("selected")) {
        for (var i = 0; i < squares.length; i++) {
            if (i < 3) {
                squares[i].style.backgroundColor = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    } else if (modeButtons[1].classList.contains("selected")) {
        for (var i = 0; i < squares.length; i++) {
            if (i >= 3) {
                squares[i].style.display = "block";
            }
            squares[i].style.backgroundColor = colors[i];
        }
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var randomIndex;
    var numberOfSquares;

    if (modeButtons[0].classList.contains("selected")) {
        numberOfSquares = 3;
    } else if (modeButtons[1].classList.contains("selected")) {
        numberOfSquares = 6;
    }

    randomIndex = Math.floor(Math.random() * numberOfSquares);
    return colors[randomIndex];
}

function generateRandomColors() {
    var arr = [];
    var numberOfColors = 0;

    if (modeButtons[0].classList.contains("selected")) {
        numberOfColors = 3;
    } else if (modeButtons[1].classList.contains("selected")) {
        numberOfColors = 6;
    }

    for (var i = 0; i < numberOfColors; i++) {
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}