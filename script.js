// DOM Variables
const addTask_button = document.querySelector(".add-task");
const todoInput_input = document.querySelector(".todo-input");
const todos_ul = document.querySelector(".todos");

// Other Variables
let todoText; 


todoInput_input.addEventListener("input", (e) => {
    todoText = e.currentTarget.value;
})

addTask_button.addEventListener("click", function(e){
    e.preventDefault();
    addTodoItem();
})

function createNewNode() {
    let newElement = document.createElement("li");
    newElement.innerHTML = `<div class="todo-content">${todoText}</div>
    <div class="edit-delete-buttons">
        <button class="edit">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    </div>`;
    newElement.id = `item${todos_ul.childElementCount}`;
    newElement.className = `todo-item`;
    return newElement;
}

function addTodoItem() {
    if (todoText !== null && todoText !== undefined && todoText !== "") {
        let newElement = createNewNode();
        todos_ul.appendChild(newElement);
        todoInput_input.value = "";
        todoText = "";
    }
    else {
        alert("Please Enter a Valid Todo");
    }
}