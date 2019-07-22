const API_URL = "https://api.coinpaprika.com/v1/tickers";
const loading = document.querySelector(".loading");
const coinDataTable = document.querySelector(".coinDataTable");
const loadingIndicator = "Coin Data Loading";

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let seconds = date.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}

function loadCoinInfo() {
  const fetchObj = fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(coinInfo) {
      console.log(coinInfo);

      loading.innerHTML = "Coin Data Load Succcess! " + getTime();
      if (coinDataTable.classList.contains("hidden")) {
        coinDataTable.classList.remove("hidden");
      }

      Array.from(coinInfo).forEach(coinArrItem => {
        const tr = document.createElement("tr");

        for (const key in coinArrItem) {
          if (key === "quotes") {
            for (const usdkey in coinArrItem[key].USD) {
              const td = document.createElement("td");
              td.innerText = coinArrItem[key].USD[usdkey];
              tr.appendChild(td);
            }
          } else {
            const td = document.createElement("td");
            td.innerText = coinArrItem[key];
            tr.appendChild(td);
          }
          // const li = `<li>${key} : ${coinArr[key]}</li>`;
          // coinInfoList.innerHTML = coinInfoList.innerHTML + li;
        }
        coinDataTable.appendChild(tr);
      });
    });
}

function init() {
  loading.innerHTML = loadingIndicator;
  setInterval(loadCoinInfo, 5000);
}

init();
