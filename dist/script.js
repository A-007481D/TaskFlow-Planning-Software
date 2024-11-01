'use strict'
// modal open & close
const openModalButton = document.getElementById('openModal'); 
const modalOverlay = document.getElementById('modalOverlay'); 
const closeModalButton = document.getElementById('closeModal'); 

let taskTitle = document.getElementById('taskTitle');
let taskStatus = document.getElementById('taskStatus');
let taskPriority = document.getElementById('taskPriority');
let taskDeadline = document.getElementById('TaskDeadline');
let taskDescription = document.getElementById('taskDescription');

openModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden'); 
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden'); 
});


// add task

let taskArray =[];



const createTask = document.getElementById("createTask");
createTask.onclick = function () {
    const task = {
        id: Date.now(),
        title : taskTitle.value,
        description: taskDescription.value,
        status: taskStatus.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value,

    }

    taskArray.push(task);
    render();
};

function render(){
    const todoTasksContainer = document.getElementById('todoTasks');
    const inProgressContainer = document.getElementById('inProgressTasks');
    const doneTasksContainer = document.getElementById('doneTasks');

    todoTasksContainer.innerHTML="";
    inProgressContainer.innerHTML="";
    doneTasksContainer.innerHTML="";

    taskArray.forEach(task => {
        const div = document.createElement("div")
        div.classList.add("bg-green-100", "rounded-lg", "p-4", "shadow", "cursor-pointer")
        div.draggable = "true"

        div.innerHTML =`
                <h3 class="font-medium text-green-800">${task.title}</h3>
                <p class="text-sm text-green-700">${task.description}</p>
                <div class="flex justify-between space-x-2 mt-3">
                  <button
                    class="bg-yellow-500 rounded-2xl w-11 ">${task.priority}
                  </button>
                  <div>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded">Edit</button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded">Delete</button>
                  </div>
                </div>            
        `
        todoTasksContainer.appendChild(div)
    });

}

// to empty the form after submit
// document.getElementById('taskTitle').value = '';
// document.getElementById('taskStatus').value = '';
// document.getElementById('taskPriority').value = '';
// document.getElementById('TaskDeadline').value = '';
// document.getElementById('taskDescription').value = '';












