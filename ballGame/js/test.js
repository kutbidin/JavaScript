// var cvs, ctx;
// function draw(canvasID) {
//     ctx = document.getElementById(canvasID).getContext("2d");
//     ctx.beginPath();
//     ctx.arc(200, 100, 30, 0, 2 * Math.PI, false);
//     ctx.strokeStyle = "blue";
//     ctx.lineWidth = 3;
//     ctx.stroke();
// }
var counter, ballSafe, interval, running, direction;
const frq = 1000 / 60;//1000/60=60Hz 
var ball, img, playerImage, cvs, cvs_color, ctxt;
var score, scoreHolder, btn_start, btn_pause, btn_resume, btn_restart, btn_setings;

function Ball(cx, cy, r, color) {
    this.color = color;
    this.centerX = cx;
    this.centerY = cy;
    this.radius = r;
}
function playerPad(img, x, y, w, h) {
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height = h;
    this.image = img;

}
function init() {
    counter = 0;
    score = 0;
    direction = 0;
    ballSafe = true;
    paused = false;
    playerImage = new Image(100, 10);
    playerImage.src = "../imgs/pad1.png";
    cvs = document.getElementById("board");

    scoreHolder = document.getElementById("score");
    btn_start = document.getElementById("btn_start");
    btn_restart = document.getElementById("btn_restart");
    btn_pause = document.getElementById("btn_pause");
    btn_resume = document.getElementById("btn_resume");
    btn_settings = document.getElementById("btn_settings");
    ctxt = cvs.getContext("2d");
    cvs_color = "blue";
    ball = new Ball(100, 130, 12, "blue");
    player = new playerPad(playerImage, 250, 580, 300, 16);
    //draw objects
    ctxt.clearRect(0, 0, cvs.width, cvs.height);
    playerImage.onload = function () {

        ctxt.drawImage(player.image, player.posX, player.posY, player.width, player.height);
    };
    ctxt.beginPath();
    ctxt.arc(ball.centerX, ball.centerY, ball.radius, 0, 2 * Math.PI, false);
    ctxt.lineWidth = 3;
    ctxt.strokeStyle = ball.color;
    ctxt.stroke();
    //score and button
    scoreHolder.innerHTML = "0";
    btn_pause.disabled = true;
    btn_restart.disabled = true;
    btn_resume.disabled = true;

}
function startGame() {
    init();
    btn_pause.disabled = false;
    btn_start.disabled = true;
    btn_restart.disabled = false;
    document.getElementById("gameOver").style.display = "none";

    running = true;
    clearInterval(interval);
    interval = setInterval(updateScreen, frq);
}
function pauseGame() {
    btn_pause.disabled = true;
    btn_resume.disabled = false;
    clearInterval(interval);
    paused = true;

}

function resumeGame() {
    paused = false;
    btn_resume.disabled = true;
    btn_pause.disabled = false;
    interval = setInterval(updateScreen, frq);

}

function restartGame() {
    startGame();
}

function updateScreen() {
    if (direction == 0) {

        ball.centerX++;
        ball.centerY++;
    }
    else if (direction == 1) {
        ball.centerX++;
        ball.centerY--;
    }
    else if (direction == 2) {
        ball.centerX--;
        ball.centerY--;
    }
    else if (direction == 3) {
        ball.centerX--;
        ball.centerY++;
    }
    scoreHolder.innerHTML = score;
    ctxt.clearRect(0, 0, cvs.width, cvs.height);
    ctxt.beginPath();
    // ctxt.fillStyle = ball.color;
    ctxt.drawImage(player.image, player.posX, player.posY, player.width, player.height);
    ctxt.arc(ball.centerX, ball.centerY, ball.radius, 0, 2 * Math.PI, false);
    ctxt.lineWidth = 3;
    ctxt.strokeStyle = ball.color;
    ctxt.stroke();
    window.onkeydown = function (event) {
        var key = event.keyCode ? event.keyCode : event.which;
        if (key == 37) {
            if (player.posX >= 20)
                player.posX -= 20;
        }
        else if (key == 39) {
            if ((player.posX + player.width) <= (cvs.width - 20))
                player.posX += 20;
        }
        else if (key == 32)
            if (paused) {
                resumeGame();
            }
            else
                pauseGame();
    }
    isBallSafe();
    if (!ballSafe) {
        pauseGame();
        btn_resume.disabled = true;
        paused = false;
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("totalScore").innerHTML = score;
    }

}
function gameSettings() {
    //window.location.assign("../html/test.html");
    pauseGame();
    document.getElementById("settings").style.display = "block";
}
function settingsOk() {

    document.getElementById("settings").style.display = "none";
}
function settingsCancel() {
    document.getElementById("settings").style.display = "none";
}
function isBallSafe() {
    //pad
    if ((player.posY) == (ball.centerY + ball.radius)) {
        if ((player.posX < ball.centerX) && (player.posX + player.width > ball.centerX)) {
            direction = 1;
            score += 10;
        }
    }
    ///bottom wall game over
    if ((ball.centerY + ball.radius) > cvs.height) {

        ballSafe = false;
    }
    // upper wall 
    if (ball.centerY - ball.radius == 0) {
        if (direction == 2) { direction = 3; }
        if (direction == 4) { direction = 0; }
    }
    // left wall
    if (ball.centerX - ball.radius == 0) {
        if (direction == 3) { direction = 0; }
        if (direction == 2) { direction = 1; }
    }
    //  right wall
    if ((ball.centerX + ball.radius) == cvs.width) {
        if (direction == 1) { direction = 2; }
        if (direction == 0) { direction = 3; }
    }
}

