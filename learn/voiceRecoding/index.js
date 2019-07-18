const recodingBtn = document.querySelector(".record-item button");
const currentTime = document.querySelector(".currentTime");
let voiceRecorder;
let playerTimer;
let playTime = 0;

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

const recodingFileDownload = event => {
  const { data: audioFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(audioFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecoding = () => {
  voiceRecorder.stop();
  clearInterval(playerTimer);
  playTime = 0;
  recodingBtn.removeEventListener("click", stopRecoding);
  recodingBtn.addEventListener("click", getUserMedia);
  recodingBtn.innerHTML = "Recoding";
};

const startRecoding = stream => {
  voiceRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    mimeType: "audio/webm"
  });
  voiceRecorder.start();
  playerTimer = setInterval(() => {
    playTime += 1;
    currentTime.innerHTML = getTimeFormet(playTime);
  }, 1000);
  console.log(voiceRecorder);
  console.dir(voiceRecorder);

  voiceRecorder.addEventListener("dataavailable", recodingFileDownload);
  recodingBtn.addEventListener("click", stopRecoding);
};

const getUserMedia = () => {
  currentTime.innerHTML = getTimeFormet(playTime);
  try {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(startRecoding);
  } catch (error) {
    alert("error!! Can't Recoding");
  } finally {
    recodingBtn.innerHTML = "Stop";
    recodingBtn.removeEventListener("click", getUserMedia);
  }
};

function init() {
  recodingBtn.addEventListener("click", getUserMedia);
}

init();
