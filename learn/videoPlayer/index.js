const videoPlayer = document.getElementById("videoPlayer");
const playBackTime = document.getElementById("playBackTime");
const playConBtn = document.getElementById("playConBtn");
const totalTime = document.getElementById("totalTime");
const volumBtn = document.getElementById("volumBtn");
const videoController = document.querySelector(".videoController");
let timeout; //video Controller hidden setTimeout Func
let currentTimeout;

function getTimeFormet(totalSecond) {
  totalSecond = Math.floor(totalSecond);
  let hour = Math.floor(totalSecond / 3600);
  let minute = Math.floor((totalSecond % 3600) / 60);
  let second = (totalSecond % 3600) % 60;

  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  return `${hour}:${minute}:${second}`;
}

function timeSetting() {
  totalTime.innerHTML = getTimeFormet(videoPlayer.duration);
}

function controllerbarView() {
  if (videoController.classList.contains("hidden")) {
    videoController.classList.remove("hidden");
  } else {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    videoController.classList.add("hidden");
    console.log("hide");
  }, 3000);
}

function playHandler() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playConBtn.innerHTML = `<i class="far fa-pause-circle"></i>`;
  } else {
    playConBtn.innerHTML = `<i class="fab fa-google-play"></i>`;
    videoPlayer.pause();
  }
}

function spaceKeyHander(event) {
  if (event.keyCode === 32) {
    playHandler();
  }
}

function volumnHander() {
  if (!videoPlayer.muted) {
    videoPlayer.muted = true;
    volumBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  } else {
    videoPlayer.muted = false;
    volumBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  }
}

function videoReplayHander() {
  playBackTime.innerHTML = getTimeFormet(0);
  videoPlayer.play();
}
function playBackTimeHander() {
  currentTimeout = setInterval(function() {
    console.log(videoPlayer.currentTime);

    if (!videoPlayer.paused) {
      playBackTime.innerHTML = getTimeFormet(videoPlayer.currentTime);
    } else {
      clearInterval(currentTimeout);
    }
  }, 1000);
}

function init() {
  videoPlayer.addEventListener("loadeddata", timeSetting);
  videoPlayer.addEventListener("mousemove", controllerbarView);
  playConBtn.addEventListener("click", playHandler);
  document.addEventListener("keypress", spaceKeyHander);
  volumBtn.addEventListener("click", volumnHander);
  videoPlayer.addEventListener("ended", videoReplayHander);
  videoPlayer.addEventListener("playing", playBackTimeHander);
}

init();
