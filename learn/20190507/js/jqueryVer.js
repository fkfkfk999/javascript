//modal 변수
const modalWriteH1 = $(".write-item > h1"); //modal의 제목부분
// 테이블 변수
const modalWriteTable = $(".boardTable > tbody"); //승인 시 데이터가 들어갈 부분

//현재 날짜 데이터를 받아와 연,월,일을 리턴해준다.
function timeSetting() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;
}

$(document).ready(function() {
  $(".writeBtn").click(function() {
    //기존에 입력했던 내용이 남아있을 수 있기 때문에 문자열과 css를초기회를 해준다.
    modalWriteH1.text("등록");
    $("#write-category").val("humor");
    $("#write-title").val("");
    $("#write-writer").val("");
    $("#write-title").css("border", "1px solid white");
    // hidden클래스를 넣었다 뺏다 한다.
    $(".modalBox_write").toggleClass("hidden");
  });
  //주변 배경 클릭 시 모달 숨기는 기능
  $(".modalBox_write_body").click(function() {
    $(".modalBox_write").toggleClass("hidden");
  });
  //닫기 버튼 클릭 시 모달을 숨김
  $("#modalWriteCloseBtn").click(function() {
    $(".modalBox_write").toggleClass("hidden");
  });

  //등록버튼 클릭 시 이벤트
  $("#modalWriteSubmitBtn").click(function() {
    //제목의 값을 가져와 그 길이가 0이면 사용자에게 입력하라고 경고한다.
    if ($("#write-title").val().length === 0) {
      // 빨간색 보더를 준다.
      $("#write-title").css("border", "5px solid red");
      // 포커스를 넘겨 바로 입력할 수 있도록 한다.
      $("#write-title").focus();
      alert("제목을 입력해주세요.");
    } else if ($("#write-writer").val().length === 0) {
      //위의 기능과 같음
      $("#write-writer").css("border", "5px solid red");
      $("#write-writer").focus();
      alert("작성자를 입력해주세요.");
    } else {
      if (modalWriteH1.text().substr(-2) === "등록") {
        //글쓰기일 경우
        //셀렉트의 값을 영어로 했기 때문에 매칭되는 한글로 다시 바꿔준다.
        let categoryVal = "";
        if ($("#write-category").val() === "humor") categoryVal = "유머";
        else if ($("#write-category").val() === "game") categoryVal = "게임";
        else if ($("#write-category").val() === "health") categoryVal = "건강";
        else if ($("#write-category").val() === "sports")
          categoryVal = "스포츠";
        // 테이블에 행을 추가하기 위해 HTML코드를 만들어 준다. +=은 기존의 데이터에 더해서 추가한다.
        let htmlCode =
          "<tr><td><input type='checkbox'  data-num='" +
          ($(".delBtn").length + 1) +
          "'></td>";
        htmlCode += "<td>" + categoryVal + "</td>";
        htmlCode += "<td>" + $("#write-title").val() + "</td>";
        htmlCode += "<td>" + $("#write-writer").val() + "</td>";
        htmlCode += "<td>" + timeSetting() + "</td>";
        htmlCode += "<td>";
        htmlCode += "<input type='button' value='수정' class='modifyBtn'>";
        htmlCode += "<input type='button' value='삭제' class='delBtn'>";
        htmlCode += "</td></tr>";
        //게시판 테이블의 tbody부분에 입력해준 값을 추가해준다.
        modalWriteTable.html(htmlCode + modalWriteTable.html());
        //일단 추가되고 나면 입력창을 닫아야 한다.
        $(".modalBox_write").toggleClass("hidden");
      } else {
        //수정일 경우
        const trNum = Number(modalWriteH1.text().substr(0, 1)) - 1; //제목에서 몇번째 데이터인지 받아온다.
        console.log(trNum);
        const trObj = modalWriteTable
          .children()
          .eq(trNum)
          .children();
        console.dir(trObj);
        // 가져온 tr객체에서 2,3,4번째 td의 객체를 가져온다. 배열은0부터 시작이므로 -1한 값을 가져옴
        const categoryTdObj = trObj.get(1);
        const titleTdObj = trObj.get(2);
        const writerTdObj = trObj.get(3);
        let categoryVal = "";
        // 카테고리에 넣어줄 값 세팅
        if ($("#write-category").val() === "humor") categoryVal = "유머";
        else if ($("#write-category").val() === "game") categoryVal = "게임";
        else if ($("#write-category").val() === "health") categoryVal = "건강";
        else if ($("#write-category").val() === "sports")
          categoryVal = "스포츠";
        // 각각의 td안에 innerText를 이용하여 내용을 바꿔준다.
        categoryTdObj.innerText = categoryVal;
        titleTdObj.innerText = $("#write-title").val();
        writerTdObj.innerText = $("#write-writer").val();
        //입력창을 끈다.
        $(".modalBox_write").toggleClass("hidden");
      }
    }
  });

  //위에 입력하지 않은 경우 보더를 red색상으로 했는데 입력 시 다시 원래대로 바꿔줘야 한다.
  $("#write-title").keyup(function() {
    //keyup은 키보드 버튼이 올라오는걸 의미 즉 입력이 생긴경우이다.
    //입력이 생겼을때 input:text에 입력된 값의 길이가 0보다 크다면 원래의 보더로 바꿔준다.
    if ($("#write-title").val().length > 0)
      $("#write-title").css("border", "1px solid white");
  });
  $("#write-writer").keyup(function() {
    if ($("#write-writer").val().length > 0)
      $("#write-writer").css("border", "1px solid white");
  });

  //새로생기는 삭제버튼은 동작을 하지 않기 때문에 on이벤트를 사용하여 해당 클래스를 지정해준다.
  //앞에 $()안에는 기존에 있던 새로생성되지 않았지만 생성된 삭제버튼을 포함하고 있는 태그를 선택하면 된다.
  //나는 테이블의 tbody를 선택했다.
  modalWriteTable.on("click", ".delBtn", function() {
    // this란 현재 클릭한 버튼을 의미한다. 현재동작하는 event.target랑 동일하다고 보면 된다.
    const delObj = $(this)
      .parent()
      .parent();
    //해당 tr을 삭제시킨다.
    delObj.remove();
  });
  // 수정버튼 클릭 시 종작
  modalWriteTable.on("click", ".modifyBtn", function() {
    //수정 버튼의 부모 태그는 td이고 td의 부모객체는 tr이다. 즉 tr객체를 받아온다.
    const trObj = $(this)
      .parent()
      .parent()
      .children();
    const trIndex = $(this)
      .parent()
      .parent()
      .parent()
      .children()
      .index(
        $(this)
          .parent()
          .parent()
      );
    //tr객체의 3번째 자식은 작성자이다.
    const write = trObj.get(3);
    const title = trObj.get(2);
    const category = trObj.get(1);
    //나중에 modal창에서도 몇번째 데이터를 수정한건지 파악하기 위해 modal 제목에 몇번째 tr인지 넣어준다.
    modalWriteH1.text(trIndex + 1 + "번째 수정");
    // //modal의 마테고리 셀렉트의 값을 넣어준다.
    if (category.innerText === "유머") $("#write-category").val("humor");
    else if (category.innerText === "게임") $("#write-category").val("game");
    else if (category.innerText === "건강") $("#write-category").val("health");
    else if (category.innerText === "스포츠")
      $("#write-category").val("sports");
    // 모달의 제목값에 수정할 값을 넣어준다.
    $("#write-title").val(title.innerText);
    // 모달의 작성자 값에 수정할 값을 넣어준다.
    $("#write-writer").val(write.innerText);
    //css를 초기화 한다.
    $("#write-title").css("border", "1px solid white");
    // 숨겨놨던 modal을 보여준다.
    $(".modalBox_write").toggleClass("hidden");
  });

  // 선택삭제 버튼 클릭 시
  $(".checkDelBtn").click(function() {
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
});
