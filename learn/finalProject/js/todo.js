const todoFrm = document.querySelector("#todoFrm"),
  todoInput = todoFrm.querySelector("#todoInput"),
  todoList = document.querySelector(".todoList");

const todoList_LS = "todo";
let arrTodo = [];
// 삭제 핸들러
function deleteTodo(event) {
  // event.target는 현재 클릭한 객체로 JAVA에서 this를 생각하면 된다.
  const clickBtn = event.target;
  const clickLi = event.target.parentNode;//부모 노드가 지워야할 li이다.
  //ul에서 해당 li를 지워준다.
  todoList.removeChild(clickLi);
  // filter은 배열의 데이터를 하나씩 검사한다.
  // 그 안에 함수를 추가하여 우리가 li에 id로 넣었던 숫자와 seqNo를 비교하여
  // 일치하는 하나의 데이터를 뺀 나머지 데이터만 cleanArrTodo로 넣어준다.
  // 즉 할일 리스트가 들어있는 객체해서 지금 삭제를 선택한 li데이터를 저장한 부분만 삭제한다.
  const cleanArrTodo = arrTodo.filter(function(todo) {
    return todo.seqNo !== parseInt(clickLi.id.substr(-1));
  });
  // 로컬에 저장할 배열에 삭제처리한 배열을 추가
  arrTodo = cleanArrTodo;
  // 로컬에 저장하여 마무리
  localSaveTodo();
}
function localSaveTodo() {
  // 일반 오브젝트를 로컬에 저장시키면 String만 저장되는 특성상 제대로 저장할 수 없다.
  // 그렇기 때문에 JSON으로 변환하여 저장시킨다.
  localStorage.setItem(todoList_LS, JSON.stringify(arrTodo));
}
// 할일을 저장해주기 위한 작업
function saveTodo(todoVal) {
  console.log(todoVal);
  // 입력한 할일을 사용자에게 보여준다.
  const todoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const todoSpan = document.createElement("span");
  const seqNo = arrTodo.length + 1;
  const id = localStorage.getItem(USER_ID);

  todoLi.id = "todoLi" + seqNo;
  delBtn.innerText = "❌";
  // 삭제작업을 처리하기 위한 이벤트를 미리 추가해준다.
  delBtn.addEventListener("click", deleteTodo);
  todoSpan.innerText = todoVal;
  todoLi.appendChild(todoSpan);
  todoLi.appendChild(delBtn);
  todoList.appendChild(todoLi);

  //할일을 객체로 만들어 배열의 형태로 저장시킨다.
  todoObj = {
    todoStr: todoVal,
    seqNo: seqNo,
    id: id
  };
  // 로컬에 저장할 배열에 객체를 넣어준다.
  arrTodo.push(todoObj);
  localSaveTodo();
}
// todo의 submit핸들러
function handleTodoSubmit(event) {
  //submit이벤트를 취소하고
  event.preventDefault();
  // 입력된 값을 가져온다.
  const saveValue = todoInput.value;

  // 값이 없을 경우 경고문
  if (saveValue === "") {
    alert("할일을 입력하지 않았습니다.");
    todoInput.focus();
  } else {
    // 값이 있다면 저장한다.
    saveTodo(saveValue);
    // 입력창은 초기화 해준다.
    todoInput.value = "";
  }
}
// 로컬에 저장된 할일을 불러온다.
function loadTodoList() {
  //로컬에서 할일 key로 저장된 json데이터를 가져온다.
  const todo = localStorage.getItem(todoList_LS);
  // 할일이 있을 경우 리스트에 출력 시켜야 한다.
  if (todo !== null) {
    console.log(todo);
    //저장한 데이터가 JSON형태이기 때문에 그냥 출력하면 JSON데이터가 출력된다.
    // 일단 파싱을 해서 객체형태로 바꿔줘야 한다.
    const jsonParsingTodo = JSON.parse(todo);
    console.log(jsonParsingTodo);
    // foreach로 할일 목록을 화면에 추가해준다.
    jsonParsingTodo.forEach(function(jpt) {
      console.log(jpt.todoStr);
      saveTodo(jpt.todoStr);
    });
  }
}
function init() {
  //할일 리스트를 로드한다.
  loadTodoList();
  //submit호출시 작동할 이벤트 리스너
  todoFrm.addEventListener("submit", handleTodoSubmit);
}

init();
