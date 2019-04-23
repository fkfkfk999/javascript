/* ------------ 클래스명 정의 -------------*/
const COLOR_RED = "font-red";
const COLOR_BLUE = "font-blue";
const COLOR_GREEN = "font-green";
const COLOR_PURPLE = "font-purple";
const FONT_SIZE_10 = "font-size10";
const FONT_SIZE_15 = "font-size15";
const FONT_SIZE_20 = "font-size20";
const FONT_SIZE_30 = "font-size30";
const FONT_WEIGHT_100 = "font-weight100";
const FONT_WEIGHT_200 = "font-weight200";
const FONT_WEIGHT_300 = "font-weight300";
const FONT_WEIGHT_400 = "font-weight400";
/* ------------ 클래스명 정의 끝 -------------*/

/* ------------ 객체 정의 -------------*/
const H1_TITLE = document.querySelector("#title");
const COLOR = document.querySelector("#fontColor");
const SIZE = document.querySelector("#fontSize");
const WEIGHT = document.querySelector("#fontWeight");
/* ------------ 객체 정의 끝 -------------*/

/* ------------ 함수 정의 -------------*/
//넘어온 객체의 클래스 중 색상과 관련된 클래스를 모두 삭제한 후 문자열의 색상클래스를 추가
function classColorChange(object, str) {
  const classObject = object.classList;

  if (classObject.contains(COLOR_RED)) classObject.remove(COLOR_RED);
  else if (classObject.contains(COLOR_BLUE)) classObject.remove(COLOR_BLUE);
  else if (classObject.contains(COLOR_GREEN)) classObject.remove(COLOR_GREEN);
  else if (classObject.contains(COLOR_PURPLE)) classObject.remove(COLOR_PURPLE);

  classObject.add(str);
}
//위와 같지만 글자 크기 클래스와 관련된 클래스를 다룬다
function classSizeChange(object, str) {
  const classObject = object.classList;

  if (classObject.contains(FONT_SIZE_10)) classObject.remove(FONT_SIZE_10);
  else if (classObject.contains(FONT_SIZE_15)) classObject.remove(FONT_SIZE_15);
  else if (classObject.contains(FONT_SIZE_20)) classObject.remove(FONT_SIZE_20);
  else if (classObject.contains(FONT_SIZE_30)) classObject.remove(FONT_SIZE_30);

  classObject.add(str);
}
//위와 같지만 글자 두께 클래스와 관련된 클래스를 다룬다
function classWeightChange(object, str) {
  const classObject = object.classList;

  if (classObject.contains(FONT_WEIGHT_100))
    classObject.remove(FONT_WEIGHT_100);
  else if (classObject.contains(FONT_WEIGHT_200))
    classObject.remove(FONT_WEIGHT_200);
  else if (classObject.contains(FONT_WEIGHT_300))
    classObject.remove(FONT_WEIGHT_300);
  else if (classObject.contains(FONT_WEIGHT_400))
    classObject.remove(FONT_WEIGHT_400);

  classObject.add(str);
}
/* ------------ 함수 정의 끝 -------------*/

console.log(COLOR);

COLOR.addEventListener("change", function() {
  if (COLOR.value == "red") classColorChange(H1_TITLE, COLOR_RED);
  else if (COLOR.value == "blue") classColorChange(H1_TITLE, COLOR_BLUE);
  else if (COLOR.value == "green") classColorChange(H1_TITLE, COLOR_GREEN);
  else if (COLOR.value == "purple") classColorChange(H1_TITLE, COLOR_PURPLE);
});

SIZE.addEventListener("change", function() {
  if (SIZE.value == "10") classSizeChange(H1_TITLE, FONT_SIZE_10);
  else if (SIZE.value == "15") classSizeChange(H1_TITLE, FONT_SIZE_15);
  else if (SIZE.value == "20") classSizeChange(H1_TITLE, FONT_SIZE_20);
  else if (SIZE.value == "30") classSizeChange(H1_TITLE, FONT_SIZE_30);
});

WEIGHT.addEventListener("change", function() {
  if (WEIGHT.value == "100") classWeightChange(H1_TITLE, FONT_WEIGHT_100);
  else if (WEIGHT.value == "200") classWeightChange(H1_TITLE, FONT_WEIGHT_200);
  else if (WEIGHT.value == "300") classWeightChange(H1_TITLE, FONT_WEIGHT_300);
  else if (WEIGHT.value == "400") classWeightChange(H1_TITLE, FONT_WEIGHT_400);
});
