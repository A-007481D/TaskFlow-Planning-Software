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

    if (!taskTitle.value || !taskStatus.value || !taskPriority.value) {
        alert("Please fill in the task title, status, and priority.");
        return;
    } else {
        let selectedDate = new Date(taskDeadline.value).getTime() 
        let currentDate = new Date().getTime()

        let diff = currentDate - selectedDate
        if (diff > 0) {
            alert("Please select a correct date")
            return;


        }

    }

    const task = {
        id: Date.now(),
        title: taskTitle.value,
        description: taskDescription.value,
        status: taskStatus.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value,
    };

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

    let todoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    taskArray.forEach(task => {
        const div = document.createElement("div")
        div.classList.add(getBGcolor(task.status), "rounded-lg", "p-4", "shadow", "cursor-pointer");
        div.draggable = "true"
        div.setAttribute("data-id", task.id);


        div.innerHTML = `
        
            <h3 class="font-medium text-black-800 cursor-pointer hover:underline hover:text-blue-800 onclick="openModal(${task.id})">${task.title}</h3>
            <p class="text-sm text-gray-700">${task.description}</p>
            <div class="flex justify-between space-x-2 mt-3">
                <button class="rounded-2xl w-11 ${getPriorityColor(task.priority)}">${task.priority}</button>
                <div class="text-gray-400 font-light">${task.deadline}</div>
                <button onclick="editTask(this)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded">Edit</button>
                <button onclick="deleteTask(this)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded">Delete</button>
            </div>
                    
        `;

        let status = parseInt(task.status);
        if (status === 1) {
            todoTasksContainer.appendChild(div);
            todoCount++;
        } else if (status === 2) {
            inProgressContainer.appendChild(div);
            inProgressCount++;
        } else if (status === 3) {
            doneTasksContainer.appendChild(div);
            doneCount++;
        } else {
            todoTasksContainer.appendChild(div);
        
        }

    });

    document.getElementById('todoCount').textContent = todoCount;
    document.getElementById('inProgresscount').textContent = inProgressCount;
    document.getElementById('doneCount').textContent = doneCount;
}


function deleteTask(element){
    const taskDiv = element.closest("div[data-id");
    const taskId = parseInt(taskDiv.getAttribute('data-id'));
    taskArray = taskArray.filter(task => task.id !== taskId);
    render(); 
}



function editTask(element)
{
    const taskDiv = element.closest("div[data-id");
    const taskId = parseInt(taskDiv.getAttribute('data-id'));
    const index= taskArray.findIndex(task => task.id === taskId)
    taskArray[index].title="yyyyyyyyyyyy";  
    // taskArray = taskArray.filter(task => task.id !== taskId);
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











