import {
    buildItemTemplate,
    buildUserTemplate 
} from './templates.js'
import { 
    todo,
    inProgress,
    done,
    usersElement,
    cardsTodoElement,
    counterTodoElement,
    cardsInProgressElement,
    counterInProgressElement,
    cardsDoneElement,
    counterDoneElement
 } from './variables.js'

// Забираем карточки из хранилища
function getTodoFromStorage () {
    const storage = localStorage.getItem('todo')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Забираем карточки из хранилища IN PROGRESS
function getInProgressFromStorage () {
    const storage = localStorage.getItem('inProgress')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Забираем карточки из хранилища DONE
function getDoneFromStorage () {
    const storage = localStorage.getItem('done')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Количество карточек TODO
function countTodoAll () {
    return todo.length
}

// Количество карточек IN PROGRESS
function countInProgressAll () {
    return inProgress.length
}

// Количество карточек DONE
function countDoneAll () {
    return done.length
}
// Функция для удаления пользователя TODO по id 
function removeTodoById (id) {
    todo.forEach((item, index) => {

        if (item.id == id) {
            todo.splice(index, 1)
        }
    })
}

// Функция для удаления пользователя IN PROGRESS по id 
function removeInProgressById (id) {
    inProgress.forEach((item, index) => {

        if (item.id == id) {
            inProgress.splice(index, 1)
        }
    })
}

// Функция для удаления пользователя DONE по id 
function removeDoneById (id) {
    done.forEach((item, index) => {

        if (item.id == id) {
            done.splice(index, 1)
        }
    })
}

// Функция для проверки на пустоту поля
function isEmpty (str) {
    if (/^\s*$/.test(str)) {
        return true
    } else {
        return false
    }
}

// Обновление хранилища колонки TODO
function updateLocalStorageTodo () {
    localStorage.setItem('todo', JSON.stringify(todo))
}

// Обновление хранилища колонки IN PROGRESS
function updateLocalStorageInProgress () {
    localStorage.setItem('inProgress', JSON.stringify(inProgress))
}

// Обновление хранилища колонки DONE
function updateLocalStorageDone () {
    localStorage.setItem('done', JSON.stringify(done))
}

// Отрисовка USERS
function renderUser (data) {
    let html = `<option selected hidden>Select user</option>`
    data.forEach(item => {
        const template = buildUserTemplate(item)
        html = html + template
    })
    usersElement.forEach(element => {
        element.innerHTML = html
    })
}

// Отрисовка карточек TODO
function renderTodo () {
    let html = ''
    todo.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })

    cardsTodoElement.innerHTML = html
    counterTodoElement.textContent = countTodoAll()
}

// Отрисовка карточек IN PROGRESS
function renderInProgress () {
    let html = ''
    inProgress.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })

    cardsInProgressElement.innerHTML = html
    counterInProgressElement.textContent = countInProgressAll()
}

// Отрисовка карточек DONE
function renderDone () {
    let html = ''
    done.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })
    cardsDoneElement.innerHTML = html
    counterDoneElement.textContent = countDoneAll()
}


export { 
    getTodoFromStorage,
    getInProgressFromStorage,
    getDoneFromStorage,
    removeTodoById,
    removeInProgressById,
    removeDoneById,
    isEmpty,
    updateLocalStorageTodo,
    updateLocalStorageInProgress,
    updateLocalStorageDone,
    renderUser,
    renderTodo,
    renderInProgress,
    renderDone
}