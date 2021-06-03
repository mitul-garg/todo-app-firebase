// DOM Variables
const addTask_button = document.querySelector(".add-task");
const todoInput_input = document.querySelector(".todo-input");
const todos_ul = document.querySelector(".todos");
const todo_form = document.getElementById("add-todo");
const removeAll_button = document.querySelector(".remove-all")

// Other Variables
let todoText;
let editFlag = false;
let editElement;

todoInput_input.addEventListener("input", (e) => {
    todoText = e.currentTarget.value;
})

todo_form.addEventListener("submit", addTodoItem);

// addTask_button.addEventListener("click", function(e){
//     e.preventDefault();
//     addTodoItem();
// })

function createNewNode() {
    let newElement = document.createElement("li");
    newElement.innerHTML = `<div class="todo-content">${todoText}</div>
    <div class="edit-delete-buttons">
        <button class="edit" id="edit${todos_ul.childElementCount}">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
        <button class="delete" id="delete${todos_ul.childElementCount}">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    </div>`;
    newElement.id = `item${todos_ul.childElementCount}`;
    newElement.className = `todo-item`;
    return newElement;
}

function addTodoItem(e) {
    e.preventDefault();
    if (!editFlag) {
        if (todoText !== null && todoText !== undefined && todoText !== "") {
            let newElement = createNewNode();
            todos_ul.appendChild(newElement);
            todoInput_input.value = "";
            todoText = "";
        }
        else {
            alert("Please Enter a Valid Todo");
        }
        let newEditTodoId = todos_ul.lastChild.lastChild.firstChild.nextSibling.id;
        let newDeleteTodoId = todos_ul.lastChild.lastChild.lastChild.previousSibling.id;
        document.getElementById(newEditTodoId).addEventListener("click", editTodo);
        document.getElementById(newDeleteTodoId).addEventListener("click", deleteTodo);
    }
    else {
        editElement.innerHTML = todoText;
        editFlag = false;
        setDefaults();
    }
}

function editTodo(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling;
    const currentTodoContent = editElement.innerHTML;
    todoInput_input.value = currentTodoContent;
    addTask_button.innerHTML = `Edit Todo`;
    editFlag = true;
}

function deleteTodo(e) {
    todos_ul.removeChild(e.currentTarget.parentElement.parentElement);
}

function setDefaults() {
    todoInput_input.value = "";
    addTask_button.innerHTML = `Add Task`;
}

removeAll_button.addEventListener("click", function(){
    while (todos_ul.childElementCount !== 0) {
        todos_ul.removeChild(todos_ul.firstElementChild);
    }
})