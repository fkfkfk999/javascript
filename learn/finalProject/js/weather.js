const weatherSpan = document.querySelector(".weather");
//날씨 정보를 가져올 api를 사용하기 위해 https://openweathermap.org/ 사이트에 가입하여 key를 받아온다.
const API_KEY = "fb111ec147e40b3150bb9d903e2863f4";
const COORDS = "coords";

function getWeather(lat, lon) {
  //홈페이지에 있는 가이드를 따라 날씨 호출 주소를 가져온다.
  //fetch가 ajax같은 효과가 있는듯 하다 새로고침 없이 데이터를 가져온다고 한다.
  //then은 ajax의 success:function을 생각하면 된다. 즉 페이지 접속이 성공한 뒤
  //해당 페이지로 부터 받아온 정보를 어떻게 다룰지 결정한다.
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(data) {
      //받아온 data는 네트워크 정보가 모두 담겨있고 우리는 거기서 json파일만 받아오면 된다.
      //하지만 json의 파일을 받아오는데 시간이 걸리므로 return해주고 다시 이작업이 끝나면 동작할 then을 해준다.
      return data.json();
    })
    .then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weatherSpan.innerText = `${temp} @ ${place}`;
    });
}

function localSaveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function geoSuccesHandler(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude;
  // json의 경우 key와 변수명이 같을 때 =을 제외하고 변수명만 써줘도 된다.
  const coordsObj = {
    latitude,
    longitude
  };
  localSaveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function geoErrorHandler() {
  console.log("에러 발생");
}
function getCoords() {
  //navigator API를 사용한다.
  //geolocation.getCurrentPosition를 이용해 좌표를 가져오는데
  //매개변수로 데이터를 가져오는게 성공시 함수와 에러발생시 함수를 넣어준다.
  navigator.geolocation.getCurrentPosition(geoSuccesHandler, geoErrorHandler);
}
function loadCoords() {
  // 로컬에 저장된 좌표정보를 가져온다.
  const localCoords = localStorage.getItem(COORDS);
  //   좌표정보가 없을경우 좌표를 받아와 저장시킨다.
  if (localCoords === null) {
    getCoords();
  } else {
    // 좌표를 가지고 날씨를 호출
    const parseJsonCoords = JSON.parse(localCoords);
    getWeather(parseJsonCoords.latitude, parseJsonCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();
