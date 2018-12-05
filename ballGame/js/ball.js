var counter, interval;
const frq = 1000 / 60;//1000/20=50Hz 
var ball, img, cvs, cvs_color, ctxt;
var score, scoreHolder, btn_start, btn_pause, btn_resume, btn_restart, btn_setings;

function Ball(cx, cy, r, color) {
    this.color = color;
    this.centerX = cx;
    this.centerY = cy;
    this.radius = r;
}

function init() {
    counter = 0;
    score = 0;
    cvs = document.getElementById("canvas");
    scoreHolder = document.getElementById("score");
    btn_start = document.getElementById("btn_start");
    btn_restart = document.getElementById("btn_restart");
    btn_pause = document.getElementById("btn_pause");
    btn_resume = document.getElementById("btn_resume");
    btn_settings = document.getElementById("btn_settings");
    ctxt = cvs.getContext("2d");
    cvs_color = "blue";
    ball = new Ball(200, 200, 30, "blue");
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
    clearInterval(interval);
    interval = setInterval(updateScreen, frq);
}
function pauseGame() {
    btn_pause.disabled = true;
    btn_resume.disabled = false;
    clearInterval(interval);

}

function resumeGame() {

    btn_resume.disabled = true;
    btn_pause.disabled = false;
    interval = setInterval(updateScreen, frq);

}

function restartGame() {
    startGame();
}

function updateScreen() {
    counter++;
    score++;
    ball.centerX++;
    ball.centerY++;
    scoreHolder.innerHTML = score;
    ctxt.clearRect(0, 0, cvs.width, cvs.height);
    ctxt.beginPath();
    // ctxt.fillStyle = ball.color;
    ctxt.arc(ball.centerX, ball.centerY, ball.radius, 0, 2 * Math.PI, false);
    ctxt.lineWidth = 3;
    ctxt.strokeStyle = ball.color;
    ctxt.stroke();
    //console.log("counter:" + counter);
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