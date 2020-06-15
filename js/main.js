let minutes = 0;
let seconds = 0;
let timeleft = 0;
let initialTimeLeft = 0;
let interval = false;
let secondAngle;
let timer = "";

// Seconds to min:sec
function convertSeconds(s) {
	let min = floor(s / 60);
  let sec = s % 60;
	return nf(min, 2) + ':' + nf(sec, 2);
}

// Set value of text
function timerText(text) {
	timer = text;
}

// Pause the timer
function pause() {
  if (interval == false) {
    minutes = parseInt(document.getElementById('time').value.split(':')[0]);
    seconds = parseInt(document.getElementById('time').value.split(':')[1]);
    if (isNaN(minutes) || isNaN(seconds)) {
      alert('Wrong time format, enter as MM:SS!');
    } else {
      timeleft = (timeleft == 0) ? (minutes * 60) + seconds : timeleft;
      initialTimeLeft = (minutes * 60) + seconds;
      console.log(minutes, seconds, timeleft);
      timerText(convertSeconds(timeleft));
      interval = setInterval(timeIt, 1000);
      document.getElementById("startstop").innerHTML = "Pause";
    }
  } else {
    timerText(convertSeconds(timeleft));
    stopTimer();
    document.getElementById("startstop").innerHTML = "Start";
  }
}

// Stop the timer
function stopTimer() {
	clearInterval(interval);
	interval = false;
}

// Timer interval
function timeIt() {
  timeleft -= 1;
  timerText(convertSeconds(timeleft));
  // Time's up
  if (timeleft <= 0) {
    pause();
    stopTimer();
    timeleft = initialTimeLeft;
    timerText(convertSeconds(timeleft));
  }
}

document.getElementById("startstop").addEventListener("click", function() {
  pause();
});

document.getElementById("reset").addEventListener("click", function() {
  pause();
  stopTimer();
  document.getElementById("startstop").innerHTML = "Start";
  timeleft = initialTimeLeft;
  timerText(convertSeconds(timeleft));
});

function setup() {
  // Define timer size
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas");
  background(255);
  angleMode(DEGREES);

  // Set initial value of text
  timerText(convertSeconds(timeleft));

  // Uncomment next line if you want to start the timer right after the page loads
  // interval = setInterval(timeIt, 1000);
}

function draw() {
  translate(width/2, height/2);
  rotate(-90);

  // Green
  push();
  stroke(255);
  fill(130, 187, 106);
  arc(0, 0, width, width, 0, 90);
  pop();

  // Yellow
  push();
  stroke(255);
  fill(254, 255, 9);
  arc(0, 0, width, width, 90, 180);
  pop();

  // Orange
  push();
  stroke(255);
  fill(255, 165, 0);
  arc(0, 0, width, width, 180, 270);
  pop();

  // Red
  push();
  stroke(255);
  fill(251, 0, 6);
  arc(0, 0, width, width, 270, 360);
  pop();
  
  // White (timer)
  push();
  noStroke();
  fill(255);
  secondAngle = map(timeleft, 0, initialTimeLeft, 360, 0);
  arc(0, 0, width, width, 0, secondAngle);
  pop();

  // Don't show blank circle before the timer starts
  if (secondAngle <= 0) {
    // Green
    push();
    stroke(255);
    fill(130, 187, 106);
    arc(0, 0, width, width, 0, 90);
    pop();

    // Yellow
    push();
    stroke(255);
    fill(254, 255, 9);
    arc(0, 0, width, width, 90, 180);
    pop();

    // Orange
    push();
    stroke(255);
    fill(255, 165, 0);
    arc(0, 0, width, width, 180, 270);
    pop();

    // Red
    push();
    stroke(255);
    fill(251, 0, 6);
    arc(0, 0, width, width, 270, 360);
    pop();
  }

  // Middle circle
  stroke(255);
  fill(255);
  ellipse(0, 0, width/2, width/2);

  // Text in circle
  fill(0);
  rotate(90);
  textAlign(CENTER, CENTER);
  textSize(width/10);
  text(timer, 0, 0);
}

