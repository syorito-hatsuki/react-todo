export const saveTodos = (todos: string[]) => localStorage.setItem("todos", JSON.stringify(todos))

export const loadTodos = (): string[] => JSON.parse(localStorage.getItem("todos") || "[]")