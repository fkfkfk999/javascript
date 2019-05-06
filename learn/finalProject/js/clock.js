const clockBox = document.querySelector(".js-clock");
//따로 클래스명을 주는게 아니라 부모의 객체에서 찾아 선언해준다.
const clockTitle = clockBox.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
}
function init() {
  getTime();
}

init();
