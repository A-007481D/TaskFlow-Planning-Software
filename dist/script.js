'use strict'
// modal open & close
const openModalButton = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('closeModal');
let addModal = document.getElementById("modal");

let taskTitle = document.getElementById('taskTitle');
let taskStatus = document.getElementById('taskStatus');
let taskPriority = document.getElementById('taskPriority');
let taskDeadline = document.getElementById('TaskDeadline');
let taskDescription = document.getElementById('taskDescription');


openModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    addModal.classList.remove("hidden");
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});




// add task

let taskArray = [];



const createTask = document.getElementById("createTask");
createTask.onclick = function () {
    const task = {
        id: Date.now(),
        title: taskTitle.value,
        description: taskDescription.value,
        status: taskStatus.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value,

    }

    taskArray.push(task);
    render();
    taskTitle.value = "";
    taskStatus.value = "";
    taskPriority.value = "";
    taskDescription.value = "";
    taskDeadline.value = "";
    addModal.classList.add("hidden");
    modalOverlay.classList.add("hidden");

};

function render() {
    const todoTasksContainer = document.getElementById('todoTasks');
    const inProgressContainer = document.getElementById('inProgressTasks');
    const doneTasksContainer = document.getElementById('doneTasks');

    todoTasksContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    doneTasksContainer.innerHTML = "";

    taskArray.forEach(task => {
        const div = document.createElement("div")
        div.classList.add(getBGcolor(task.status), "rounded-lg", "p-4", "shadow", "cursor-pointer");
        div.draggable = "true"
        div.setAttribute("data-id", task.id);


        div.innerHTML = `
        
            <h3 class="font-medium text-black-800">${task.title}</h3>
            <p class="text-sm text-gray-700">${task.description}</p>
            <div class="flex justify-between space-x-2 mt-3">
                <button class="rounded-2xl w-11 ${getPriorityColor(task.priority)}">${task.priority}</button>
                <div class="text-gray-400 font-light">${task.deadline}</div>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded">Edit</button>
                <button onclick="deleteTask(this)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded">Delete</button>
            </div>
                    
        `;

        let status = parseInt(task.status);
        if (status === 1) {
            todoTasksContainer.appendChild(div);
        } else if (status === 2) {
            inProgressContainer.appendChild(div);
        } else if (status === 3) {
            doneTasksContainer.appendChild(div);
        } else {
            todoTasksContainer.appendChild(div);
        }

    });

}

function deleteTask(element){
    const taskDiv = element.closest("div[data-id");
    const taskId = parseInt(taskDiv.getAttribute('data-id'));
    taskArray = taskArray.filter(task => task.id !== taskId);
    render(); 
}

// function deleteTask(element) {
//     let div = element.parentNode;
//     div.remove();
// }







function getPriorityColor(priority) {
    switch (priority) {
        case "P1":
            return "bg-red-500";
        case "P2":
            return "bg-yellow-500";
        case "P3":
            return "bg-green-500";
        default:
            return "bg-gray-500";
    }
}


function getBGcolor(status) {
    switch (status) {
        case "1":
            return "bg-blue-100";

        case "2":
            return "bg-yellow-100";

        case "3":
            return "bg-green-100";
    }
}




// to empty the form after submit
// document.getElementById('taskTitle').value = '';
// document.getElementById('taskStatus').value = '';
// document.getElementById('taskPriority').value = '';
// document.getElementById('TaskDeadline').value = '';
// document.getElementById('taskDescription').value = '';











