// DOM Variables
const addTask_button = document.querySelector(".add-task");
const todoInput_input = document.querySelector(".todo-input");
const todos_ul = document.querySelector(".todos");
const todo_form = document.getElementById("add-todo");
const removeAll_button = document.querySelector(".remove-all");
const login_a = document.querySelector(".open-modal-login");
const signup_a = document.querySelector(".open-modal-signup");
const login_modal = document.querySelector(".modal-container-login");
const signup_modal = document.querySelector(".modal-container-signup");
const loggedOutItems = document.querySelectorAll(".logged-out");
const loggedInItems = document.querySelectorAll(".logged-in");

// Other Variables
let todoText;
let editFlag = false;
let editElement;
let firebaseFlag = false;
let updateIDFirebase;
let currentUser = null;

// setting up UI
function setupUI (user) {
    if (user) {
        loggedInItems.forEach(item=>{
            item.style.display = "";
        })
        loggedOutItems.forEach(item=>{
            item.style.display = "none";
        })
    }
    else {
        loggedInItems.forEach(item=>{
            item.style.display = "none";
        })
        loggedOutItems.forEach(item=>{
            item.style.display = "";
        })
    }
}

todoInput_input.addEventListener("input", (e) => {
    todoText = e.currentTarget.value;
})

todo_form.addEventListener("submit", addTodoItem);

// addTask_button.addEventListener("click", function(e){
//     e.preventDefault();
//     addTodoItem();
// })

function addEventListenersToEditDelete() {
    let newEditTodoId = todos_ul.lastChild.lastChild.firstChild.nextSibling.id;
    let newDeleteTodoId = todos_ul.lastChild.lastChild.lastChild.previousSibling.id;
    document.getElementById(newEditTodoId).addEventListener("click", editTodo);
    document.getElementById(newDeleteTodoId).addEventListener("click", deleteTodo);
} 

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
            // todos_ul.appendChild(newElement);

            // firebase save
            db.collection("alltodos").doc(currentUser.uid).collection("todos").add({
                title: todoText
            })
            // firebase save ends

            todoInput_input.value = "";
            todoText = "";
        }
        else {
            alert("Please Enter a Valid Todo");
        }
        // addEventListenersToEditDelete();

    }
    else {
        editElement.innerHTML = todoText;
        editFlag = false;

        db.collection("alltodos").doc(currentUser.uid).collection("todos").doc(updateIDFirebase).update({
            title: todoText
        })

        setDefaults();
    }
}

function editTodo(e) {

    updateIDFirebase = e.currentTarget.parentElement.parentElement.getAttribute("data-id");
    
    editElement = e.currentTarget.parentElement.previousElementSibling;
    const currentTodoContent = editElement.innerHTML;
    todoInput_input.value = currentTodoContent;
    addTask_button.innerHTML = `Edit Todo`;
    editFlag = true;
}

function deleteTodo(e) {
    let id = e.currentTarget.parentElement.parentElement.getAttribute("data-id");
    db.collection("alltodos").doc(currentUser.uid).collection("todos").doc(id).delete();
    todos_ul.removeChild(e.currentTarget.parentElement.parentElement);
}

function setDefaults() {
    todoInput_input.value = "";
    addTask_button.innerHTML = `Add Task`;
}

removeAll_button.addEventListener("click", function(){
    while (todos_ul.childElementCount !== 0) {
        let id = todos_ul.firstElementChild.getAttribute("data-id");
        db.collection("alltodos").doc(currentUser.uid).collection("todos").doc(id).delete();
        todos_ul.removeChild(todos_ul.firstElementChild);
    }
})


// firebase starts

function renderList(doc) {
    todoText = doc.data().title;
    let newElement = createNewNode();
    newElement.setAttribute("data-id", doc.id);
    todos_ul.append(newElement);
    addEventListenersToEditDelete();
}

function getTodos() {
    todos_ul.innerHTML = "";
    currentUser = auth.currentUser;

    document.querySelector("#user-email").innerHTML = (currentUser != null ? currentUser.email : "");

    if (currentUser === null) {
        todos_ul.innerHTML = `<h3 style="text-align:center">Please Login To Get Todos</h3>`;
        return;
    }


    db.collection("alltodos").doc(currentUser.uid).collection("todos").orderBy("title").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == "added") {
                renderList(change.doc);
            }
            else if (change.type == "removed") {
                // console.log("removed");
            }
            else if (change.type == "modified") {
                // console.log("modified");
            }
        });
    })
}


// firebase ends


// login and signup modals start

login_a.addEventListener("click", function(e){
    e.preventDefault();
    login_modal.classList.toggle("show-login-modal");
    signup_modal.classList.remove("show-signup-modal");
})

signup_a.addEventListener("click", function(e){
    e.preventDefault();
    signup_modal.classList.toggle("show-signup-modal");
    login_modal.classList.remove("show-login-modal");
})

// login and singup modals end