const frm = document.querySelector(".frm"), //form객체
  inputId = frm.querySelector("#userId"), //form안의 input객체 id를 입력받는다.
  userGreeting = document.querySelector(".userGreeting"), //id입력 시 로그인된 상태를 출력
  logoutBtn = document.querySelector(".logoutBtn"), //로그아웃 버튼
  currentBox = document.querySelector(".currentBox"); //접속시 보여줄 박스

const USER_ID = "currentUser", //접속중인 유저의 키값
  SHOW_CLASS = "show"; //css상 display를 보여주기 위한 클래스

//로컬 저장소에 입력한 id를 저장하는 함수
function saveUserId(userId) {
  localStorage.setItem(USER_ID, userId);
}
//form이 submit되는 순간 실행되는 이벤트를 핸들러 해줄 함수
function handleSubmit(event) {
  //submit핸들러지만 submit 이벤트를 취소시킨다.
  //submit작업을 하기전에 다른 작업을 먼저 해주기 위함이다.
  event.preventDefault();
  const inputData = inputId.value;
  console.log(inputData);
  //입력되지 않은 데이터를 경고
  if (inputData === "") {
    alert("Id를 입력하지 않았습니다.");
    inputId.focus();
  } else {
    //id를 저장하고 접속상태를 표시해준다.
    saveUserId(inputData);
    currentUserGreeting(inputData);
  }
}
//로그아웃 클릭 시 로컬에서 현재 접속중인 계정을 삭제
function localRemoveId() {
  localStorage.removeItem(USER_ID);
  loadId();
  inputId.value = "";
}
//현재 로컬에 접속중인 id가 없을 시 입력창을 보여준다.
function userIdInputShow() {
  frm.classList.add(SHOW_CLASS);
  currentBox.classList.remove(SHOW_CLASS);
  frm.addEventListener("submit", handleSubmit);
}
//로컬에서 접속중인게 확인될경우의 셋팅
function currentUserGreeting(userId) {
  console.log(userId);

  frm.classList.remove(SHOW_CLASS);
  currentBox.classList.add(SHOW_CLASS);
  userGreeting.innerText = `${userId}님 환영합니다.`;
  logoutBtn.addEventListener("click", localRemoveId);
}
// 로컬에서 id를 받아와 입력을 받을지 접속정보를 보여줄지 load해준다.
function loadId() {
  //현재 로컬에서 currentUser로 매핑되는 데이터를 가져온다.
  const currentId = localStorage.getItem(USER_ID);
  console.log(currentId);

  // null이라는 것은 아직 로컬에 currentUser로 입력된 데이터가 없다는 것이다.
  if (currentId === null) {
    userIdInputShow();
  } else {
    //null이 아니므로 데이터가 있으므로 접속상태를 출력해준다.
    currentUserGreeting(currentId);
  }
}

function init() {
  loadId();
}

init();
