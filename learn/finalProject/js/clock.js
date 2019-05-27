const clockBox = document.querySelector(".js-clock");
//따로 클래스명을 주는게 아니라 부모의 객체에서 찾아 선언해준다.
const clockTitle = clockBox.querySelector("h1");
const clockTitle2 = clockBox.querySelector("h2");

function getTime() {
  const date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let seconds = date.getSeconds();
  // 삼항 연산자를 이용한 방법이다.
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  // 1자리에 2자리 규격으로 맞추고 싶을 경우 10보다 작으면 앞에 문자 0을 추가한다.
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  clockTitle2.innerText = `${hours}:${minutes}:${seconds}`;
}
function init() {
  getTime();
  //setInterval은 (함수명, ms(밀리세컨드))로 구성되어있고 뒤에 설정한 숫자마다 앞에적은 함수를 실행한다.
  setInterval(getTime, 1000);
}

init();
