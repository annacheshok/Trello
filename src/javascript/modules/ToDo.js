// Конструктор карточки
function ToDo (title, description, user) {
    this.title = title
    this.description = description
    this.user = user
    this.id = Date.now()
    this.createdAt = new Date()
}

export { ToDo }