'use strict'

const openModalButton = document.getElementById('openModal'); 
const modalOverlay = document.getElementById('modalOverlay'); 
const closeModalButton = document.getElementById('closeModal'); 

openModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden'); 
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden'); 
});



