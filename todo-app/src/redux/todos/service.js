import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
    "todos/getTodosAsync",
    async () => {
        const response = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
        return response.data
    }
)

export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
        return response.data
    }
)

export const toggleTodoAsync = createAsyncThunk(
    'todos/toggleTodoAsync',
    async ({ id, data }) => {
        const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data)
        return res.data
    })

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
        return id;
    })
export const clearCompletedTodosAsync = createAsyncThunk(
    "todos/clearCompletedTodosAsync",
    async (completed) => {
        const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, completed)
        console.log(res.data);
        return res.data
    }
)
