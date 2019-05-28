const todoFrm = document.querySelector("#todoFrm"),
  todoInput = todoFrm.querySelector("#todoInput"),
  todoList = document.querySelector(".todoList");

const todoList_LS = "todo",
  arrTodo = [];

function localSaveTodo() {
  // 일반 오브젝트를 로컬에 저장시키면 String만 저장되는 특성상 제대로 저장할 수 없다.
  // 그렇기 때문에 JSON으로 변환하여 저장시킨다.
  localStorage.setItem(todoList_LS, JSON.stringify(arrTodo));
}
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
    todoInput.value = "";
  }
}
// 로컬에 저장된 할일을 불러온다.
function loadTodoList() {
  const todo = localStorage.getItem(todoList_LS);
  // 할일이 있을 경우 리스트에 출력 시켜야 한다.
  if (todo !== null) {
    console.log(todo);
    //저장한 데이터가 JSON형태이기 때문에 그냥 출력하면 JSON데이터가 출력된다.
    // 일단 파싱을 해서 객체형태로 바꿔줘야 한다.
    const jsonParsingTodo = JSON.parse(todo);
    console.log(jsonParsingTodo);
    jsonParsingTodo.forEach(function(jpt) {
      console.log(jpt.todoStr);
      saveTodo(jpt.todoStr);
    });
  }
}
function init() {
  loadTodoList();
  //submit호출시 작동할 이벤트 리스너
  todoFrm.addEventListener("submit", handleTodoSubmit);
}

init();
