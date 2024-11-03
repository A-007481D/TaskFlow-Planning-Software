'use strict'
// modal open & close
const openModalButton = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');
const editModalOverlay = document.getElementById('editModalOverlay');
const closeModalButton = document.getElementById('closeModal');

let addModal = document.getElementById("modal");
let editModal = document.getElementById("editModal");

// create inputz
let taskTitle = document.getElementById('taskTitle');
let taskStatus = document.getElementById('taskStatus');
let taskPriority = document.getElementById('taskPriority');
let taskDeadline = document.getElementById('TaskDeadline');
let taskDescription = document.getElementById('taskDescription');


// edit inputz
let editTaskTitle = document.getElementById('editTaskTitle');
let editTaskStatus = document.getElementById('editTaskStatus');
let editTaskPriority = document.getElementById('editTaskPriority');
let editTaskDeadline = document.getElementById('editTaskDeadline');
let editTaskDescription = document.getElementById('editTaskDescription');

function openeditModalOverlay() {
    editModalOverlay.classList.remove('hidden');
    editModal.classList.remove("hidden");
    return;
}

openModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    addModal.classList.remove("hidden");
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    taskTitle.value = "";
    taskStatus.value = "";
    taskPriority.value = "";
    taskDescription.value = "";
    taskDeadline.value = "";
});




// add task

let taskArray = [];

const createTask = document.getElementById("createTask");
createTask.onclick = function () {

    if (!taskTitle.value || !taskStatus.value || !taskPriority.value) {
        alert("Please fill in the task title, status, and priority.");
        return;
    // } else {
    //     let selectedDate = new Date(taskDeadline.value).getTime() 
    //     let currentDate = new Date().getTime()

    //     let diff = currentDate - selectedDate
    //     if (diff > 0) {
    //         alert("Please select a correct date")
    //         return;


    //     }

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
        div.classList.add(getBGcolor(task.status),getBGHovercolor(task.status), "rounded-lg", "p-4", "shadow", "cursor-pointer", "fade-in");
        div.draggable = "true"
        div.setAttribute("data-id", task.id);


        div.innerHTML = `

            <h3 class="font-medium text-black-800 cursor-pointer hover:underline hover:text-blue-800 onclick="openeditModalOverlay()">${task.title}</h3>
            <!-- <p class="text-sm text-gray-700">${task.description}</p> -->
            <div class="flex items-center justify-between space-x-2 mt-3">
                <button class="rounded w-11 ${getPriorityColor(task.priority)}">${task.priority}</button>
                <div class="bg-white rounded px-2 border-gray-950 text-gray-700 font-normal">${task.deadline}</div>
               <div class="flex justify-center space-x-2">
                <button onclick="editTask(this)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded"><svg class="w-4 fill-white" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg></button>

                <button onclick="deleteTask(this)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded"><svg class="w-4 " fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>

               </div>
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
    openeditModalOverlay();

    const index= taskArray.findIndex(task => task.id === taskId)
     editTaskTitle.value = taskArray[index].title;
     editTaskStatus.value = taskArray[index].status; 
     editTaskPriority.value = taskArray[index].priority;
     editTaskDeadline.value = taskArray[index].deadline;
     editTaskDescription.value = taskArray[index].description;
    
     document.getElementById('submitChange').onclick = function (){ update(index)};
    
    
     
}

    function update(index){
        if (!editTaskTitle.value || !editTaskStatus.value || !editTaskPriority.value) {
            alert("Please fill in the task title, status, and priority.");
            return;
        // } else {
        //     let selectedDate = new Date(taskDeadline.value).getTime() 
        //     let currentDate = new Date().getTime()
    
        //     let diff = currentDate - selectedDate
        //     if (diff > 0) {
        //         alert("Please select a correct date")
        //         return;
    
    
        //     }
    
        }
    
        taskArray[index].title =editTaskTitle.value ;
        taskArray[index].status =editTaskStatus.value ; 
        taskArray[index].priority =editTaskPriority.value ;
        taskArray[index].deadline =editTaskDeadline.value ;
        taskArray[index].description =editTaskDescription.value ;
        editModalOverlay.classList.add('hidden');
        editModal.classList.add("hidden");
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
function getBGHovercolor(status) {
    switch (status) {
        case "1":
            return "hover:bg-blue-200";

        case "2":
            return "hover:bg-yellow-200";

        case "3":
            return "hover:bg-green-200";
    }
}




// to empty the form after submit
// document.getElementById('taskTitle').value = '';
// document.getElementById('taskStatus').value = '';
// document.getElementById('taskPriority').value = '';
// document.getElementById('TaskDeadline').value = '';
// document.getElementById('taskDescription').value = '';











