const body = document.querySelector("body");

const IMG_COUNT = 3;

function paintImage(selectNum) {
  const img = new Image(); //이미지 태그 생성
  img.src = `../img/${selectNum}.jpg`; //랜덤숫자중 선택된 숫자로 된 이미지 파일 설정
  img.classList.add("bgImg"); //백그라운드 이미지 css를 해줄 클래스명을 넣어준다.
  body.appendChild(img); //바디에 추가
}
function getRandomNum() {
  // 이미지의 갯수만큼 랜덤숫자를 만들어 리턴해준다.
  // 1~3이 필요할 경우 3을 곱하면 0~2가 나오기 때문에 1을 더한다.
  return Math.floor(Math.random() * IMG_COUNT + 1);
}
function init() {
  /* 
        js의 Math 내장함수에는 랜덤한 소수 데이터를 가져오는 random()
        소수를 올림하는 ceil, 소수를 내림하는 floor이 있다.
        random() * 원하는 랜덤 조건을 넣고 그 값을 올리거나 내리면 된다.
    */
  const randomNum = getRandomNum();
  paintImage(randomNum);
}

init();
