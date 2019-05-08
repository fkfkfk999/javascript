//time셋팅 변수
let timeBox = document.querySelector(".timeViewer");
let timeBoxClock = timeBox.querySelector("h2");
//modal 변수
const writeBtn = document.querySelector(".writeBtn"); //글쓰기 버튼
const modalWriteBox = document.querySelector(".modalBox_write"); //modal의 컨테이너
const modalWriteBoxBody = document.querySelector(".modalBox_write_body"); //modal의 배경부분
const modalWriteH1 = document.querySelector(".write-item > h1"); //modal의 배경부분
const modalWriteCategory = document.querySelector("#write-category"); //modal의 셀렉트박스
const modalWriteTitle = document.querySelector("#write-title"); //modal의 제목입력부
const modalWriteWriter = document.querySelector("#write-writer"); //modal의 작성자 입력부
const modalWriteSubmitBtn = document.querySelector("#modalWriteSubmitBtn"); //승인버튼
const modalWriteDelBtn = document.querySelector("#modalWriteCloseBtn"); //닫기버튼
// 테이블 변수
const modalWriteTable = document.querySelector(".boardTable > tbody"); //승인 시 데이터가 들어갈 부분
const trDelBtn = modalWriteTable.querySelectorAll(".delBtn"); //삭제버튼 여러개 있기 때문에 querySelectorAll사용
//querySelectorAll로 가져올 경우 정적인 클래스를 가져오지 못한다. 이럴 경우 getElementsByClassName사용
const trDelBtn2 = modalWriteTable.getElementsByClassName("delBtn");
// const trModyfiBtn = document.querySelectorAll(".modifyBtn"); //수정버튼 여러개 있기 때문에 querySelectorAll사용
//버튼 변수
const checkDelBtn = document.querySelector(".checkDelBtn");

//현재 날짜 데이터를 받아와 연,월,일을 리턴해준다.
function timeSetting() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;
}
//글쓰기 버튼 클릭 이벤트
writeBtn.addEventListener("click", function() {
  //기존에 입력했던 내용이 남아있을 수 있기 때문에 문자열과 css를초기회를 해준다.
  modalWriteH1.innerText = "등록";
  modalWriteCategory.value = "humor";
  modalWriteTitle.value = "";
  modalWriteWriter.value = "";
  modalWriteTitle.style.border = "1px solid white";
  if (modalWriteBox.classList.contains("hidden")) {
    modalWriteBox.classList.remove("hidden");
  }
});
//주변 배경 클릭 시 모달 숨기는 기능
modalWriteBoxBody.addEventListener("click", function() {
  if (!modalWriteBox.classList.contains("hidden")) {
    modalWriteBox.classList.add("hidden");
  }
});
//닫기 버튼 클릭 시 모달을 숨김
modalWriteDelBtn.addEventListener("click", function() {
  if (!modalWriteBox.classList.contains("hidden")) {
    modalWriteBox.classList.add("hidden");
  }
});
//등록버튼 클릭 시 이벤트
modalWriteSubmitBtn.addEventListener("click", function() {
  //제목의 값을 가져와 그 길이가 0이면 사용자에게 입력하라고 경고한다.
  if (modalWriteTitle.value.length === 0) {
    // 빨간색 보더를 준다.
    modalWriteTitle.style.border = "5px solid red";
    // 포커스를 넘겨 바로 입력할 수 있도록 한다.
    modalWriteTitle.focus();
    alert("제목을 입력해주세요.");
  } else if (modalWriteWriter.value.length === 0) {
    //위의 기능과 같음
    modalWriteWriter.style.border = "5px solid red";
    modalWriteWriter.focus();
    alert("작성자를 입력해주세요.");
  } else {
    console.log(modalWriteH1.innerText.substr(-2));
    if (modalWriteH1.innerText.substr(-2) === "등록") {
      //글쓰기일 경우
      //셀렉트의 값을 영어로 했기 때문에 매칭되는 한글로 다시 바꿔준다.
      let categoryVal = "";
      if (modalWriteCategory.value === "humor") categoryVal = "유머";
      else if (modalWriteCategory.value === "game") categoryVal = "게임";
      else if (modalWriteCategory.value === "health") categoryVal = "건강";
      else if (modalWriteCategory.value === "sports") categoryVal = "스포츠";
      // 테이블에 행을 추가하기 위해 HTML코드를 만들어 준다. +=은 기존의 데이터에 더해서 추가한다.
      let htmlCode =
        "<tr><td><input type='checkbox'  data-num='" +
        (trDelBtn2.length + 1) +
        "'></td>";
      htmlCode += "<td>" + categoryVal + "</td>";
      htmlCode += "<td>" + modalWriteTitle.value + "</td>";
      htmlCode += "<td>" + modalWriteWriter.value + "</td>";
      htmlCode += "<td>" + timeSetting() + "</td>";
      htmlCode += "<td>";
      htmlCode += "<input type='button' value='수정' class='modifyBtn'>";
      htmlCode += "<input type='button' value='삭제' class='delBtn'>";
      htmlCode += "</td></tr>";
      //게시판 테이블의 tbody부분에 입력해준 값을 추가해준다.
      modalWriteTable.innerHTML = htmlCode + modalWriteTable.innerHTML;
      //일단 추가되고 나면 입력창을 닫아야 한다.
      //class리스트에 모달을 숨기는 hidden이 있는지 체크한다.
      if (!modalWriteBox.classList.contains("hidden")) {
        // 없다면 hidden을 추가하여 숨긴다.
        modalWriteBox.classList.add("hidden");
      }
      console.log(trDelBtn2);
    } else {
      //수정일 경우
      const trNum = modalWriteH1.innerText.substr(0, 1); //제목에서 몇번째 데이터인지 받아온다.
      console.log(trNum);
      // tr객체를 받아오는데 modalWriteTable는 tbody이므로 th부분을 빼기위해 -1을 해준다.
      const trObj = modalWriteTable.rows[trNum - 1];
      // 가져온 tr객체에서 2,3,4번째 td의 객체를 가져온다. 배열은0부터 시작이므로 -1한 값을 가져옴
      const categoryTdObj = trObj.cells[1];
      const titleTdObj = trObj.cells[2];
      const writerTdObj = trObj.cells[3];
      let categoryVal = "";
      // 카테고리에 넣어줄 값 세팅
      if (modalWriteCategory.value === "humor") categoryVal = "유머";
      else if (modalWriteCategory.value === "game") categoryVal = "게임";
      else if (modalWriteCategory.value === "health") categoryVal = "건강";
      else if (modalWriteCategory.value === "sports") categoryVal = "스포츠";
      // 각각의 td안에 innerText를 이용하여 내용을 바꿔준다.
      categoryTdObj.innerText = categoryVal;
      titleTdObj.innerText = modalWriteTitle.value;
      writerTdObj.innerText = modalWriteWriter.value;
      //입력창을 끈다.
      if (!modalWriteBox.classList.contains("hidden")) {
        // 없다면 hidden을 추가하여 숨긴다.
        modalWriteBox.classList.add("hidden");
      }
    }
  }
});
//위에 입력하지 않은 경우 보더를 red색상으로 했는데 입력 시 다시 원래대로 바꿔줘야 한다.
modalWriteTitle.addEventListener("keyup", function() {
  //keyup은 키보드 버튼이 올라오는걸 의미 즉 입력이 생긴경우이다.
  //입력이 생겼을때 input:text에 입력된 값의 길이가 0보다 크다면 원래의 보더로 바꿔준다.
  if (modalWriteTitle.value.length > 0)
    modalWriteTitle.style.border = "1px solid white";
});
modalWriteWriter.addEventListener("keyup", function() {
  if (modalWriteWriter.value.length > 0)
    modalWriteWriter.style.border = "1px solid white";
});
//모든 클릭버튼 이벤트에 반응하는 함수이다.
//글쓰기를 함으로써 삭제버튼이 처음 3개보다 많아 지지만 모든 문서를 기준으로 찾기 때문에 동작한다.
document.body.addEventListener("click", function(event) {
  // 그중에 삭제버튼과 일치하는 클래스만 작업한다.
  if (event.target.classList.contains("delBtn")) {
    //삭제버튼의 부모인 td,td의 부모인 tr을 가져와 delObj를 생성한다.
    const delObj = event.target.parentElement.parentElement;
    // 해당 tr을 삭제시킨다.
    modalWriteTable.removeChild(delObj);
  }
  //수정버튼을 클릭할 경우의 이벤트 리스너
  if (event.target.classList.contains("modifyBtn")) {
    //수정 버튼의 부모 태그는 td이고 td의 부모객체는 tr이다. 즉 tr객체를 받아온다.
    const trObj = event.target.parentElement.parentElement;
    //tr객체의 3번째 자식은 작성자이다.
    const write = trObj.cells[3];
    const title = trObj.cells[2];
    const category = trObj.cells[1];
    console.log(`${write}/${title}/${category}`);
    console.log(`${write.innerText}/${title.innerText}/${category.innerText}`);
    //나중에 modal창에서도 몇번째 데이터를 수정한건지 파악하기 위해 modal 제목에 몇번째 tr인지 넣어준다.
    modalWriteH1.innerText = trObj.rowIndex + "번째 수정";
    //modal의 마테고리 셀렉트의 값을 넣어준다.
    if (category.innerText === "유머") modalWriteCategory.value = "humor";
    else if (category.innerText === "게임") modalWriteCategory.value = "game";
    else if (category.innerText === "건강") modalWriteCategory.value = "health";
    else if (category.innerText === "스포츠")
      modalWriteCategory.value = "sports";
    // 모달의 제목값에 수정할 값을 넣어준다.
    modalWriteTitle.value = title.innerText;
    // 모달의 작성자 값에 수정할 값을 넣어준다.
    modalWriteWriter.value = write.innerText;
    //css를 초기화 한다.
    modalWriteTitle.style.border = "1px solid white";
    // 숨겨놨던 modal을 보여준다.
    if (modalWriteBox.classList.contains("hidden")) {
      modalWriteBox.classList.remove("hidden");
    }
  }
});
//삭제버튼은 각각 tr마다 있기 때문에 반복시켜 이벤트를 확인해야한다.
//btn은 각각의 반복상태에서 사용되는 변수이다.
//이 방법을 사용 시 처음엔 삭제가 되지만 글쓰기를 하고 난 이후 동작하지 않는다.
//기존에 3개였던 삭제버튼이 4개가 되면서 독작하지 않는것이다.
// trDelBtn.forEach(btn => {
//   btn.addEventListener("click", function() {
//     console.log(btn);
//     //삭제할 오브젝트 즉 제거할 tr
//     //btn은 버튼, btn.parentElement는 td, btn.parentElement.parentElement는 tr이다.
//     const delObj = btn.parentElement.parentElement;
//     modalWriteTable.removeChild(delObj);
//   });
// });

// 선택삭제 버튼 클릭 시
checkDelBtn.addEventListener("click", function() {
  // modalWriteTable 게시판의 tbody안에서 input태그들을 받아온다.
  const inputDataArr = modalWriteTable.getElementsByTagName("input");
  // 받아온 input이 여러개이기 때문에 반복문을 사용해준다.
  Array.from(inputDataArr).forEach(inputData => {
    // input타입이 checkbox인 경우에만 작업을 계속한다.
    if (inputData.type === "checkbox") {
      // 체크박스가 체크되어 있는것만 작업을 한다.
      if (inputData.checked) {
        //체크박스의 부모인 td,td의 부모인 tr을 가져와 delObj를 생성한다.
        const delObj = inputData.parentElement.parentElement;
        // 해당 tr을 삭제시킨다.
        modalWriteTable.removeChild(delObj);
      }
    }
  });
});
