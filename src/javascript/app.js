
// Ссылки на DOM элементы

const cardsTodoElement = document.querySelector('.cards-todo')
const cardsInProgressElement = document.querySelector('.cards-in-progress')
const cardsDoneElement = document.querySelector('.cards-done')
const counterTodoElement = document.querySelector('.columns-item__title-todo').querySelector('span')
const counterInProgressElement = document.querySelector('.columns-item__title-in-progress').querySelector('span')
const counterDoneElement = document.querySelector('.columns-item__title-done').querySelector('span')
const modalAddElement = document.querySelector('.modal-content__container')
console.log(modalAddElement)

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

    return `<div class="card card-todo id=${payload.id}">
                <div class="card__control">
                    <select class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example" id="btn-select">
                        <option selected hidden>select</option>
                        <option value="1">Todo</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                     </select>
                    <button type="button" class="btn btn-light" id="btn-edit">edit</button>
                    <button type="button" class="btn btn-light" id="btn-delete">delete</button>
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
    const user = userCardValueElement.options[userCardValueElement.selectedIndex].text;
    const card = new ToDo(titleCardElement.value, descriptionCardElement.value, user )
    todo.push(card)
    modalAddElement.reset()
    updateLocalStorageTodo()
    renderTodo()
}

window.addEventListener('DOMContentLoaded', handleClock)
modalAddElement.addEventListener('submit', handleAddCard)