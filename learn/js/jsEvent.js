// function resizePush() {
//   console.log("사이즈가 변경되었습니다.");
// }
// window.addEventListener("resize", resizePush);
// window.addEventListener("resize", function() {
//   alert("사이즈가 변경되었습니다.");
// });
let checkboxs = document.querySelector(".numbers");
let title = document.querySelector("#title");
const BASE_COLOR = "black";
checkboxs.addEventListener("click", function(event) {
  console.log(event);
  alert(this.value);
});
title.addEventListener("mouseover", function() {
  if (title.style.color == BASE_COLOR) title.style.color = "rgb(29, 131, 226)";
  else title.style.color = BASE_COLOR;
});
