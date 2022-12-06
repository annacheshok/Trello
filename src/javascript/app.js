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
const selectEditElement = modalEditElement.querySelector('#btn-select-user')
const modalDeleteAllElement = document.querySelector('#modal-delete-all')
const modalInProgressElement = document.querySelector('#modal-in-progress')
const usersElement = document.querySelectorAll('#btn-select-user')
const buttonCancelInModalElement = document.querySelectorAll('.btn-cancel')
const buttonDelAllItemElement = document.querySelector('#btn-del-all')

// Забираем карточки из хранилища
function getTodoFromStorage() {
    const storage = localStorage.getItem('todo')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Забираем карточки из хранилища IN PROGRESS
function getInProgressFromStorage() {
    const storage = localStorage.getItem('inProgress')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Забираем карточки из хранилища DONE
function getDoneFromStorage() {
    const storage = localStorage.getItem('done')

    if (!storage) return []

    const result = JSON.parse(storage)

    result.forEach(item => {
        item.createdAt = new Date(item.createdAt)
    })

    return result
}

// Массив с объектами карточек TODO
let todo = getTodoFromStorage()
// Массив с объектами карточек IN PROGRESS
let inProgress = getInProgressFromStorage()
// Массив с объектами карточек DONE
let done = getDoneFromStorage()


// Первоначальная отрисовка
renderTodo()
renderInProgress()
renderDone()





// Количество карточек TODO
function countTodoAll() {
    return todo.length
}

// Количество карточек IN PROGRESS
function countInProgressAll() {
    return inProgress.length
}

// Количество карточек DONE
function countDoneAll() {
    return done.length
}

// Функция для удаления пользователя TODO по id 
function removeTodoById(id) {
    todo.forEach((item, index) => {

        if (item.id == id) {
            todo.splice(index, 1)
        }
    })
}

// Функция для удаления пользователя IN PROGRESS по id 
function removeInProgressById(id) {
    inProgress.forEach((item, index) => {

        if (item.id == id) {
            inProgress.splice(index, 1)
        }
    })
}

// Функция для удаления пользователя DONE по id 
function removeDoneById(id) {
    done.forEach((item, index) => {

        if (item.id == id) {
            done.splice(index, 1)
        }
    })
}

// Функция для проверки на пустоту поля
function isEmpty(str) {
    if (/^\s*$/.test(str)) {
        return true
    } else {
        return false
    }
}

// FETCH
fetch(url)
    .then(response => {
        return response.json()
    })
    .then((data) => {
        renderUser(data)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
    })


// Обновление хранилища колонки TODO
function updateLocalStorageTodo() {
    localStorage.setItem('todo', JSON.stringify(todo))
}

// Обновление хранилища колонки IN PROGRESS
function updateLocalStorageInProgress() {
    localStorage.setItem('inProgress', JSON.stringify(inProgress))
}

// Обновление хранилища колонки DONE
function updateLocalStorageDone() {
    localStorage.setItem('done', JSON.stringify(done))
}

// Отрисовка USERS
function renderUser(data) {
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
function renderTodo() {
    let html = ''
    todo.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })

    cardsTodoElement.innerHTML = html
    counterTodoElement.textContent = countTodoAll()
}

// Отрисовка карточек IN PROGRESS
function renderInProgress() {
    let html = ''
    inProgress.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })

    cardsInProgressElement.innerHTML = html
    counterInProgressElement.textContent = countInProgressAll()
}

// Отрисовка карточек DONE
function renderDone() {
    let html = ''
    done.forEach(item => {
        const template = buildItemTemplate(item)
        html = html + template
    })
    cardsDoneElement.innerHTML = html
    counterDoneElement.textContent = countDoneAll()
}

// Конструктор карточки
function ToDo(title, description, user) {
    this.title = title
    this.description = description
    this.user = user
    this.id = Date.now()
    this.createdAt = new Date()
}

// Шаблон для карточки
function buildItemTemplate(payload) {
    let todo = ''
    let inProgress = ''
    let done = ''
    let classCard = ''

    let card = JSON.stringify(payload)

    if (localStorage.getItem('todo').includes(card)) {
        todo = 'selected'
        classCard = 'card-todo'
    } else if (localStorage.getItem('inProgress').includes(card)) {
        inProgress = 'selected'
        classCard = 'card-in-progress'
    } else if (localStorage.getItem('done').includes(card)) {
        done = 'selected'
        classCard = 'card-done'
    }

    return `<div class="card ${classCard}" id=${payload.id}>
                <div class="card__control">
                    <select class="form-select form-select-lg mb-3 btn-select"
                    aria-label=".form-select-lg example" >
                        <option ${todo} value="1">Todo</option>
                        <option ${inProgress} value="2">In Progress</option>
                        <option ${done} value="3">Completed</option>
                     </select>
                    <button type="button" class="btn btn-light btn-edit">edit</button>
                    <button type="button" class="btn btn-light btn-delete">delete</button>
                </div>
                <h3 class="card__title">
                    ${payload.title}
                </h3>
                <p class="card__description">
                ${payload.description}
                </p>
                <p class="card__user">
                ${payload.user}
                </p>
                <p class="card__time">
                ${payload.createdAt.toLocaleString()}
                </p>
            </div>`
}

// Шаблон для карточки User
function buildUserTemplate(payload) {
    return `<option value="${payload.name}">${payload.name}</option>`
}

// Очистка формы после отмены добавления карточки
function handleCancelModal(event) {
    const modal = event.target.closest('.modal-content__container')
    modal.reset()
}

// Получение текущего времени
function handleClock() {
    setInterval(() => {
        let date = new Date(),
            hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        document.querySelector('.header__time').innerHTML = hours + ':' + minutes;
    }, 1000)
}

// Добавление карточки
function handleAddCard(event) {
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
function handleClickButtonRemoveItem(event) {
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
function handleClickButtonEditItem(event) {
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
function handleClickButtonChangeColumnItem(event) {
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

function handleDeleteAllCard(event) {
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

modalAddElement.addEventListener('submit', handleAddCard)
buttonDelAllItemElement.addEventListener('click', handleDeleteAllCard)
cardsTodoElement.addEventListener('click', handleClickButtonRemoveItem)
allCardsElement.addEventListener('click', handleClickButtonRemoveItem)
allCardsElement.addEventListener('click', handleClickButtonEditItem)
allCardsElement.addEventListener('click', handleClickButtonChangeColumnItem)
buttonCancelInModalElement.forEach(item => {
    item.addEventListener('click', handleCancelModal)
})
window.addEventListener('DOMContentLoaded', handleClock)


renderTodo()
renderInProgress()
renderDone()