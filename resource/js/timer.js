let timerStarted = null
let timerStopped = null
let updatingTimer = null;

function startTimer() {
  timerStarted = new Date();
  updatingTimer = setInterval(updateTimer, 10);
}

function stopTimer() {
  timerStopped = new Date();
  clearInterval(updatingTimer);
}

async function resetTimer() {
  clearInterval(updatingTimer);
  timerStarted = null;
  timerStopped = null;
  await $('#timer').html('00:00:00.000');
}

async function updateTimer() {
  let timeCurrent = new Date();
  let timePassed = new Date(timeCurrent - timerStarted);
  let h = timePassed.getUTCHours()
  let m = timePassed.getUTCMinutes()
  let s = timePassed.getUTCSeconds()
  let ms = timePassed.getUTCMilliseconds();

  await $('#timer').html(
    (h > 9 ? h : "0" + h) + ":" +
    (m > 9 ? m : "0" + m) + ":" +
    (s > 9 ? s : "0" + s) + "." +
    (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms)
  );
};