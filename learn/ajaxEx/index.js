const API_URL = "http://ip-api.com/json/";
const loading = document.querySelector(".loading");
const coordInfoList = document.querySelector(".coordInfoList");

function loadCoords() {
  const fetchObj = fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(coord) {
      loading.innerHTML = "Data Load Succcess!";
      for (const key in coord) {
        const li = `<li>${key} : ${coord[key]}</li>`;
        coordInfoList.innerHTML = coordInfoList.innerHTML + li;
      }
    });
}

function init() {
  loadCoords();
}

init();
