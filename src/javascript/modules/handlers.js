import { todo,
    inProgress,
    done,
    modalAddElement,
    modalEditElement,
    modalDeleteAllElement
} from './variables.js'
import {
    updateLocalStorageTodo,
    updateLocalStorageInProgress,
    updateLocalStorageDone,
    renderTodo,
    renderInProgress,
    renderDone,
    removeTodoById,
    removeInProgressById,
    removeDoneById,
    isEmpty
} from './helpers.js'
import { ToDo } from './ToDo.js'

// Очистка формы после отмены добавления карточки
function handleCancelModal (event) {
    const modal = event.target.closest('.modal-content__container')
    modal.reset()
}

// Получение текущего времени
function handleClock () {
    setInterval(() => {
        let date = new Date(),
            hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        document.querySelector('.header__time').innerHTML = hours + ':' + minutes;
    }, 1000)
}

// Добавление карточки
function handleAddCard (event) {
    event.preventDefault()
    const titleCardElement = document.querySelector('.modal-content__title')
    const descriptionCardElement = document.querySelector('.modal-content__description')
    const userCardValueElement = document.querySelector('#btn-select-user')

    if (!isEmpty(titleCardElement.value) || !isEmpty(descriptionCardElement.value) && userCardValueElement.selectedIndex != 0) {
        const card = new ToDo(titleCardElement.value, descriptionCardElement.value, userCardValueElement.value)
        todo.push(card)
        updateLocalStorageTodo()
        renderTodo()
    }
    modalAddElement.reset()
}

// Обработчик события на кнопку "Delete" у карточки
function handleClickButtonRemoveItem (event) {
    const target = event.target
    if (target.classList.contains('btn-delete')) {

        if (target.closest('.card-todo')) {
            const closestElement = target.closest('.card-todo')
            const id = closestElement.id
            removeTodoById(id)
            updateLocalStorageTodo()
            renderTodo()
        }

        else if (target.closest('.card-in-progress')) {
            const closestElement = target.closest('.card-in-progress')
            const id = closestElement.id
            removeInProgressById(id)
            updateLocalStorageInProgress()
            renderInProgress()
        }

        else if (target.closest('.card-done')) {
            const closestElement = target.closest('.card-done')
            const id = closestElement.id
            removeDoneById(id)
            updateLocalStorageDone()
            renderDone()
        }
    }
}

// Обработчик события на кнопку "Edit" у карточки
function handleClickButtonEditItem (event) {
    const target = event.target
    if (target.classList.contains('btn-edit')) {

        if (target.closest('.card-todo')) {

            const closestElement = target.closest('.card-todo')
            const id = closestElement.id
            const item = todo.find(el => el.id == id)

            modalEditElement.querySelector('.modal-content__title').value = item.title
            modalEditElement.querySelector('.modal-content__description').value = item.description
            modalEditElement.querySelector('#btn-select-user').value = item.user

            var myModal = new bootstrap.Modal(document.querySelector('.modal-edit'), {
                keyboard: false
            })
            myModal.show()

            const titleCardElement = modalEditElement.querySelector('.modal-content__title')
            const descriptionCardElement = modalEditElement.querySelector('.modal-content__description')
            const user = modalEditElement.querySelector('#btn-select-user')

            modalEditElement.addEventListener('submit', function () {
                item.title = titleCardElement.value
                item.description = descriptionCardElement.value
                item.user = user.value
                updateLocalStorageTodo()
                renderTodo()
            })
        } else if (target.closest('.card-in-progress')) {

            const closestElement = target.closest('.card-in-progress')
            const id = closestElement.id
            const item = inProgress.find(el => el.id == id)

            modalEditElement.querySelector('.modal-content__title').value = item.title
            modalEditElement.querySelector('.modal-content__description').value = item.description
            modalEditElement.querySelector('#btn-select-user').value = item.user

            var myModal = new bootstrap.Modal(document.querySelector('.modal-edit'), {
                keyboard: false
            })
            myModal.show()

            const titleCardElement = modalEditElement.querySelector('.modal-content__title')
            const descriptionCardElement = modalEditElement.querySelector('.modal-content__description')
            const user = modalEditElement.querySelector('#btn-select-user')

            modalEditElement.addEventListener('submit', function () {
                item.title = titleCardElement.value
                item.description = descriptionCardElement.value
                item.user = user.value
                updateLocalStorageInProgress()
                renderInProgress()
            })
        } else if (target.closest('.card-done')) {

            const closestElement = target.closest('.card-done')
            const id = closestElement.id
            const item = done.find(el => el.id == id)

            modalEditElement.querySelector('.modal-content__title').value = item.title
            modalEditElement.querySelector('.modal-content__description').value = item.description
            modalEditElement.querySelector('#btn-select-user').value = item.user

            var myModal = new bootstrap.Modal(document.querySelector('.modal-edit'), {
                keyboard: false
            })
            myModal.show()

            const titleCardElement = modalEditElement.querySelector('.modal-content__title')
            const descriptionCardElement = modalEditElement.querySelector('.modal-content__description')
            const user = modalEditElement.querySelector('#btn-select-user')

            modalEditElement.addEventListener('submit', function () {
                item.title = titleCardElement.value
                item.description = descriptionCardElement.value
                item.user = user.value
                updateLocalStorageDone()
                renderDone()
            })
        }
    }
}

// Обработчик события смену колонки у карточки
function handleClickButtonChangeColumnItem (event) {
    const target = event.target
    if (target.classList.contains('btn-select')) {

        if (target.closest('.card-todo')) {
            const closestElement = target.closest('.card-todo')
            const columns = closestElement.querySelector('.btn-select')
            if (columns.selectedIndex != 0) {

                const id = closestElement.id
                let item = todo.find(el => el.id == id)
                let index = -1
                let count = 0
                todo.forEach(item => {
                    if (item.id == id) {
                        index = count
                    }
                    count++
                })
                if (columns.selectedIndex == 1) {
                    if (inProgress.length == 3) {
                        var myModal = new bootstrap.Modal(document.querySelector('.modal-in-progress'), {
                            keyboard: false
                        })
                        myModal.show()
                    } else {
                        todo.splice(index, 1)
                        inProgress.push(item)
                        updateLocalStorageTodo()
                        updateLocalStorageInProgress()
                        renderTodo()
                        renderInProgress()
                    }
                }
                else if (columns.selectedIndex == 2) {
                    todo.splice(index, 1)
                    done.push(item)
                    updateLocalStorageTodo()
                    updateLocalStorageDone()
                    renderTodo()
                    renderDone()
                }
            }
        }
        else if (target.closest('.card-in-progress')) {
            const closestElement = target.closest('.card-in-progress')
            const columns = closestElement.querySelector('.btn-select')
            if (columns.selectedIndex != 1) {

                const id = closestElement.id
                let item = inProgress.find(el => el.id == id)
                let index = -1
                let count = 0
                inProgress.forEach(item => {
                    if (item.id == id) {
                        index = count
                    }
                    count++
                })
                if (columns.selectedIndex == 0) {
                    inProgress.splice(index, 1)
                    todo.push(item)
                    updateLocalStorageInProgress()
                    updateLocalStorageTodo()
                    renderInProgress()
                    renderTodo()
                }
                else if (columns.selectedIndex == 2) {
                    inProgress.splice(index, 1)
                    done.push(item)
                    updateLocalStorageInProgress()
                    updateLocalStorageDone()
                    renderInProgress()
                    renderDone()
                }
            }
        }
        else if (target.closest('.card-done')) {
            const closestElement = target.closest('.card-done')
            const columns = closestElement.querySelector('.btn-select')
            if (columns.selectedIndex != 2) {

                const id = closestElement.id
                let item = done.find(el => el.id == id)
                let index = -1
                let count = 0
                done.forEach(item => {
                    if (item.id == id) {
                        index = count
                    }
                    count++
                })
                if (columns.selectedIndex == 0) {
                    done.splice(index, 1)
                    todo.push(item)
                    updateLocalStorageDone()
                    updateLocalStorageTodo()
                    renderDone()
                    renderTodo()
                }
                else if (columns.selectedIndex == 1) {
                    if (inProgress.length == 3) {
                        var myModal = new bootstrap.Modal(document.querySelector('.modal-in-progress'), {
                            keyboard: false
                        })
                        myModal.show()
                    } else {
                        done.splice(index, 1)
                        inProgress.push(item)
                        updateLocalStorageDone()
                        updateLocalStorageInProgress()
                        renderDone()
                        renderInProgress()
                    }
                }
            }
        }
    }
}

// Удаление карточек в колонке Done
function handleDeleteAllCard (event) {
    var myModal = new bootstrap.Modal(document.querySelector('.modal-delete-all'), {
        keyboard: false
    })
    myModal.show()

    modalDeleteAllElement.addEventListener('submit', function () {
        event.preventDefault()
        done.length = 0
        updateLocalStorageDone()
        renderDone()
    })
}

export {
    handleCancelModal,
    handleClock,
    handleAddCard,
    handleClickButtonRemoveItem,
    handleClickButtonEditItem,
    handleClickButtonChangeColumnItem,
    handleDeleteAllCard
}