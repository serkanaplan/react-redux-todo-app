import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {selectFilteredTodos } from '../redux/todos/todosSlice'
import { toggleTodoAsync, deleteTodoAsync, getTodosAsync } from '../redux/todos/service'
import Loading from './loading/Loading'
import Error from './error/Error'


export default function TodoList() {

    // let items = useSelector(selectTodos)
    const items = useSelector(selectFilteredTodos)
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.todos.isLoading)
    const error = useSelector((state) => state.todos.error)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    const handleClick = (id) => {
        if (window.confirm("Are you sure?"))
           dispatch(deleteTodoAsync(id))
    }

    const handleToggle = (id, completed) => {
        dispatch(toggleTodoAsync({ id, data: { completed } }))
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error} />
    }
    return (
        <ul className="todo-list">
            {
                items.map((item) => {
                    return (
                        <li key={item.id} className={item.completed ? "completed" : ""}>
                            <div className="view">
                                <input className="toggle" type="checkbox" checked={item.completed} onChange={() => handleToggle(item.id, !item.completed)} />
                                <label>{item.title}</label>
                                <button className="destroy" onClick={() => handleClick(item.id)}></button>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
