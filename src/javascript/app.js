
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
const buttonCancelInModalElement = document.querySelectorAll('.btn-cancel')

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
const todo = getTodoFromStorage()
// Массив с объектами карточек IN PROGRESS
const inProgress = getInProgressFromStorage()
// Массив с объектами карточек DONE
const done = getDoneFromStorage()


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
            todo.splice(index, 1)
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
    const todo = payload.status == 'todo' ? 'selected' : ''
    const inProgress = payload.status == 'inProgress' ? 'selected' : ''
    const done = payload.status == 'done' ? 'selected' : ''
    return `<div class="card card-todo" id=${payload.id}>
                <div class="card__control">
                    <select class="form-select form-select-lg mb-3 btn-select"
                    aria-label=".form-select-lg example">
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
    const user = userCardValueElement.options[userCardValueElement.selectedIndex].text

    if (!isEmpty(titleCardElement.value) && !isEmpty(descriptionCardElement.value) && userCardValueElement.selectedIndex != 0) {
        const card = new ToDo(titleCardElement.value, descriptionCardElement.value, user)
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
            modalEditElement.querySelector('#btn-select-user').selectedIndex = 2
            var myModal = new bootstrap.Modal(document.querySelector('.modal-edit'), {
                keyboard: false
            })
            myModal.show()
            //updateLocalStorageTodo()
            // renderTodo()
        }
        /*
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
                }*/
    }

}


window.addEventListener('DOMContentLoaded', handleClock)
modalAddElement.addEventListener('submit', handleAddCard)
cardsTodoElement.addEventListener('click', handleClickButtonRemoveItem)
allCardsElement.addEventListener('click', handleClickButtonRemoveItem)
allCardsElement.addEventListener('click', handleClickButtonEditItem)
buttonCancelInModalElement.forEach(item => {
    console.log(item)
    item.addEventListener('click', handleCancelModal)
})
renderTodo()
renderInProgress()
renderDone()