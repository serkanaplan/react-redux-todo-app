import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoAsync } from '../redux/todos/service'
import Loading from './loading/Loading'
import Error from './error/Error'
// import { nanoid } from '@reduxjs/toolkit'


export default function Form() {
    const [title, setTitle] = useState("")

    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading)
    const error= useSelector((state) => state.todos.addNewTodo.error)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim()) {
            // dispatch(addTodo({id: nanoid(),text: title,completed: false,}))
            // dispatch(addTodo({title}))
            await dispatch(addTodoAsync({ title }))
            setTitle("")
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input disabled={isLoading} className='new-todo' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {isLoading && <span style={{ marginRight: '10px' }}>
                <Loading />
            </span>}
        {error && <Error message={error}/>}    
        </form>
        </>
    )
}
