let gamePattern = [];
let userPattern = [];
let level = 0;

function randomNumbers() {
    return Math.floor(Math.random() * 4);
}

function swtchCases(color) {
    return ["green", "red", "yellow", "blue"].indexOf(color);
}

function classAdd(event) {
    event.classList.add("pressed");
    setTimeout(() => {
        event.classList.remove("pressed");
    }, 100);
}

function Wrong(event) {
    var a = new Audio("./wrong.mp3");
    a.play();
    event.classList.add("game-over");
    setTimeout(() => {
        event.classList.remove("game-over");
    }, 200);
}

function audio(r) {
    let colors = ["green", "red", "yellow", "blue"];
    let d = document.querySelector("." + colors[r]);
    classAdd(d);
    let a = new Audio("./"+colors[r]+".mp3");
    a.play();
}

function nextSequence() {
    userPattern = []; 
    level++;
    $("h1").text("Level " + level);
    let r = randomNumbers();
    gamePattern.push(r);
    audio(r);
}

function checkAnswer(index) {
    if (userPattern[index] === gamePattern[index]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); 
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    Wrong(document.body);
    $("h1").text("Game Over! Press Any Key to Restart");
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
}

$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userPattern.push(swtchCases(userChosenColor));
    audio(swtchCases(userChosenColor));
    checkAnswer(userPattern.length - 1);
});

$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }
});
