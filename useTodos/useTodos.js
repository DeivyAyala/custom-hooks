import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])  // Si Cambia un Todo se graba en el local Storage

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action )
        // console.log(todo)
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })

        // console.log(id)
    }

    const handleToggleTodo = (id) => {
       dispatch({
        type: '[TODO] Toggle Todo',
        payload: id
       })
    }

    // const todosCount = todos.length

    // const pendingTodosCount = todos.filter(todo => !todo.done).length



  return {
    todos,
    handleNewTodo, 
    handleDeleteTodo,
    handleToggleTodo,

    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length 

  }
}
