import {
    url,
    cardsTodoElement,
    allCardsElement,
    modalAddElement,
    buttonCancelInModalElement,
    buttonDelAllItemElement,
} from './modules/variables.js'

import {
    renderUser,
    renderTodo,
    renderInProgress,
    renderDone
} from './modules/helpers.js'

import {
    handleCancelModal,
    handleClock,
    handleAddCard,
    handleClickButtonRemoveItem,
    handleClickButtonEditItem,
    handleClickButtonChangeColumnItem,
    handleDeleteAllCard
} from './modules/handlers.js'

// Первоначальная отрисовка
renderTodo()
renderInProgress()
renderDone()

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