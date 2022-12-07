import {
     getTodoFromStorage,
     getInProgressFromStorage,
     getDoneFromStorage
} from './helpers.js'

// Ссылка на массив USERS
const url = 'https://jsonplaceholder.typicode.com/users'

// Ссылки на DOM элементы
const cardsTodoElement = document.querySelector('.cards-todo')
const cardsInProgressElement = document.querySelector('.cards-in-progress')
const cardsDoneElement = document.querySelector('.cards-done')
const allCardsElement = document.querySelector('.columns')
const counterTodoElement = document.querySelector('.columns-item__title-todo').querySelector('span')
const counterInProgressElement = document.querySelector('.columns-item__title-in-progress').querySelector('span')
const counterDoneElement = document.querySelector('.columns-item__title-done').querySelector('span')
const modalAddElement = document.querySelector('#modal-add')
const modalEditElement = document.querySelector('#modal-edit')
const modalDeleteAllElement = document.querySelector('#modal-delete-all')
const modalInProgressElement = document.querySelector('#modal-in-progress')
const usersElement = document.querySelectorAll('#btn-select-user')
const buttonCancelInModalElement = document.querySelectorAll('.btn-cancel')
const buttonDelAllItemElement = document.querySelector('#btn-del-all')

// Массив с объектами карточек TODO
let todo = getTodoFromStorage()
// Массив с объектами карточек IN PROGRESS
let inProgress = getInProgressFromStorage()
// Массив с объектами карточек DONE
let done = getDoneFromStorage()

export { url,
    cardsTodoElement,
    cardsInProgressElement,
    cardsDoneElement,
    allCardsElement,
    counterTodoElement,
    counterInProgressElement,
    counterDoneElement,
    modalAddElement,
    modalEditElement,
    modalDeleteAllElement,
    modalInProgressElement,
    usersElement,
    buttonCancelInModalElement,
    buttonDelAllItemElement,
    todo,
    inProgress,
    done
}