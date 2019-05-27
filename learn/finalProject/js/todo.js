const todoFrm = document.querySelector("#todoFrm"),
  todoInput = todoFrm.querySelector("#todoInput"),
  todoList = document.querySelector(".todoList");

const TodoList_LS = "todo";

function saveTodo(todoVal) {
  console.log(todoVal);
  const todoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const todoSpan = document.createElement("span");
  todoSpan.innerText = todoVal;
  todoLi.appendChild(todoSpan);
  todoLi.appendChild(delBtn);
  todoList.appendChild(todoLi);
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
  const todo = localStorage.getItem("TodoList_LS");
  // 할일이 있을 경우 리스트에 출력 시켜야 한다.
  if (todo !== null) {
  }
}
function init() {
  loadTodoList();
  //submit호출시 작동할 이벤트 리스너
  todoFrm.addEventListener("submit", handleTodoSubmit);
}

init();
