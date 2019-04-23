let title = document.getElementById("title");
console.log(title);
title.innerHTML = "스크립트를 통해 변경된 H1";
//dir을 통해 해당 객체의 속성들을 확인할 수 있다.
console.dir(title);
console.log(title.id);
console.log(title.nodeName);
title.style.color = "rgb(29, 131, 226)";
console.dir(document);
// querySelector를 이용해 선택자로 가져올 수 있다.
let str = document.querySelector("#test-str");
str.innerHTML = str.innerHTML + "<br> 동적으로 수정하였습니다.";
