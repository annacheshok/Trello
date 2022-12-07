// Шаблон для карточки
function buildItemTemplate (payload) {
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
function buildUserTemplate (payload) {
    return `<option value="${payload.name}">${payload.name}</option>`
}

export {
    buildItemTemplate,
    buildUserTemplate 
}