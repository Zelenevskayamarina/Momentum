const todoButton = document.querySelector('.todo__button');
const todo = document.querySelector('.todo');
const todoOverlay = document.querySelector('.todo__overlay');

todoButton.addEventListener('click', () => {
    todo.classList.add('active');
    todoOverlay.classList.add('active');
});

document.body.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        document.querySelector('.todo.active').classList.remove('active');
        document.querySelector('.todo__overlay').classList.remove('active');
    };
}, false);

todoOverlay.addEventListener('click', () => {
    document.querySelector('.todo.active').classList.remove('active');
    todo.classList.remove('active');
    todoOverlay.classList.remove('active');
});

const todoContentThird = document.querySelector('.todo__content-third');
const newTodoInput = document.querySelector('.new-todo');
const todoSearch = document.querySelector('.todo-search');
const dateCreateTodo = document.querySelector('.todo__content-date');
const addTodoBtn = document.querySelector('.add-todo');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteLastBtn = document.querySelector('.delete-last');
const deleteBtn = document.querySelector('.todo__content-delete');
const showCompletedResultBtn = document.querySelector('.show-completed');
const showAllResultBtn = document.querySelector('.show-all');
const allResult = document.querySelector('.all-result');
const completedResult = document.querySelector('.completed-result');

let todoList = [];
let todoListIsCompleted = [];

newTodoInput.focus();

function addTodo() {
    if (newTodoInput.value) {
        const newTodo = {
            content: newTodoInput.value,
            id: Math.floor(Math.random() * 10),
            isCompleted: 'false',
        }

        todoList.push(newTodo);
        clearInput();
        newTodoInput.focus();
        renderTodoList();
        countAllResult();

    } else if (newTodoInput.value.trim().length === 0) {
        alert('Please enter text, the field must not be empty!')
    }
}

function clearInput() {
    if (newTodoInput.value) {
        newTodoInput.value = '';
    }
    if (todoSearch.value) {
        todoSearch.value = '';
    }
}

function renderTodoList() {
    todoContentThird.textContent = '';
    for (let i = 0; i < todoList.length; i++) {
        let newTodo = todoList[i];
        addNewTodoToDOM(newTodo);
    }
}

function addNewTodoToDOM(newTodo) {
    const todoContentItem = document.createElement('div');
    todoContentItem.className += "todo__content-item";
    // console.log(todoContentItem);

    const todoContentTodo = document.createElement('div');
    todoContentTodo.className += "todo__content-todo";
    // console.log(todoContentTodo);

    const todoContentInputNew = document.createElement('input');
    todoContentInputNew.className += "todo__content-input-new";
    todoContentInputNew.type = "checkbox";
    todoContentInputNew.name = "todo";
    // console.log(todoContentInputNew);

    const todoContentTextNew = document.createElement('label');
    todoContentTextNew.className += "todo__content-text-new";
    todoContentTextNew.setAttribute('for', 'todo');
    // console.log(todoContentTextNew);

    const todoContentForm = document.createElement('div');
    todoContentForm.className += "todo__content-form";
    // console.log(todoContentForm);

    const todoContentDelete = document.createElement('button');
    todoContentDelete.className += "todo__content-delete";
    // console.log(todoContentDelete);

    const todoContentDate = document.createElement('date');
    todoContentDate.className += "todo__content-date";
    // console.log(todoContentDate);

    todoContentForm.appendChild(todoContentDelete);
    todoContentForm.appendChild(todoContentDate);
    // console.log(todoContentForm);

    todoContentTodo.appendChild(todoContentInputNew);
    todoContentTodo.appendChild(todoContentTextNew);
    // console.log(todoContentTodo);

    todoContentItem.appendChild(todoContentTodo);
    todoContentItem.appendChild(todoContentForm);

    todoContentThird.appendChild(todoContentItem);
    // console.log(todoContentThird);

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const todayNow = day + '.' + month + '.' + year;
    todoContentDate.textContent = `${todayNow}`;
    todoContentTextNew.textContent = newTodo.content;

    todoContentDelete.addEventListener("click", () => {
        if (todoContentInputNew.checked) {
            deleteTodo(newTodo);
        }
    });

    showAllResultBtn.addEventListener('click', () => {
        if (todoContentItem.style.opacity = '0') {
            todoContentItem.style.opacity = '1';
            todoContentItem.classList.remove('width');
        }
    });

    showCompletedResultBtn.addEventListener('click', () => {
        if (!todoContentInputNew.checked) {
            todoContentItem.style.opacity = '0';
            todoContentItem.classList.add('width');
        }
    });

    todoContentInputNew.addEventListener("change", () => {
        if (todoContentInputNew.checked) {
            completeTask(newTodo);
            todoListIsCompleted.push(newTodo);
            // completedResult.textContent = `${todoListIsCompleted.length}`;

        } else if (!todoContentInputNew.checked) {
            todoListIsCompleted.pop(newTodo);
            // completedResult.textContent = `${todoListIsCompleted.length}`;
        }
    });

    todoSearch.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            if (todoSearch.value != `${todoContentTextNew.textContent}`) {
                todoContentItem.style.opacity = '0';
                todoContentItem.classList.add('width');
                clearInput();
            }
        }
    });
}

    addTodoBtn.addEventListener('click', addTodo);


    function deleteAllTodo() {
        setTimeout(() => {
            alert('All tasks deleted!')
        }, 100)
        todoList = [];
        renderTodoList();
        console.log(todoList);
        countAllResult();
    }

    deleteAllBtn.addEventListener('click', () => deleteAllTodo());

    function deleteLastTodo() {
        todoList.pop();
        renderTodoList();
        countAllResult();
    }

    deleteLastBtn.addEventListener('click', () => deleteLastTodo());

    function deleteTodo(newTodo) {
        const todoIndexByDelete = todoList.findIndex((item) => item.id == newTodo.id);
        todoList.splice(todoIndexByDelete, 1)
        renderTodoList();
        countAllResult();
        completedResult.textContent = `${todoListIsCompleted.length - 1}`;
    }

    function countAllResult() {
        allResult.textContent = `${todoList.length}`;
    }

    function completeTask(newTodo) {    
        const index = todoList.findIndex((item) => item.id == newTodo.id ? newTodo.isCompleted = 'true' : newTodo.isCompleted = 'false')

        if (newTodo.isCompleted) {
            todoList.splice(index, 1, {
                ...todoList[index],

                isCompleted: newTodo.isCompleted,
            });        
            setTimeout(() => {
                alert('Task done!')
            }, 150)
        }    
    }