import { createSlice } from "@reduxjs/toolkit";
import { addTodoAsync, deleteTodoAsync, toggleTodoAsync, getTodosAsync, clearCompletedTodosAsync } from "./service";



export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        // activeFilter: "All",
        activeFilter: localStorage.getItem("activeFilter") || "All",
        isLoading: false,
        error: null,
        addNewTodo: {
            isLoading: false,
            error: null
        }
    },
    reducers: {
        // addTodo: (state, action) => {
        //     state.items.push(action.payload);
        // },
        // addtodo metoduna prepare ekledik böylece id ve false parametreleri default atanacak, component sayfasında herseferinde girmemize gerek kalmayacak
        // addTodo: {
        //     reducer: (state, action) => {
        //         state.items.push(action.payload)
        //     },
        //     prepare: ({data} ) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 text: data,
        //                 completed: false
        //             }
        //         }
        //     }
        // },
        // toggleTodo: (state, action) => {
        //     const todo = state.items.find((todo) => todo.id === action.payload);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },
        // removeTodo: (state, action) => {
        //     state.items = state.items.filter((item) => item.id !== action.payload);

        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },

        clearCompleted: (state) => {
            state.items = state.items.filter((item) => item.completed === false);

        }
    },
    extraReducers: (builder) => {
        //get todos
        builder
            .addCase(getTodosAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            //add todo
            .addCase(addTodoAsync.pending, (state) => {
                state.addNewTodo.isLoading = true;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.addNewTodo.isLoading = false;
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodo.isLoading = false;
                state.addNewTodo.error = action.error.message;
            })
            //toggle 
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, completed } = action.payload;
                const index = state.items.findIndex(item => item.id === id);
                state.items[index].completed = completed;
            })
            //delete
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const id = action.payload;
                const filtered = state.items.filter((item => item.id !== id));
                state.items = filtered;

            })
            //todos CLEAR COMPLETED
            .addCase(clearCompletedTodosAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.items = action.payload
            })
    }
});

export const selectTodos = (state) => state.todos.items
export const selectActiveFilter = (state) => state.todos.activeFilter
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "All")
        return state.todos.items
    return state.todos.items.filter((item) => state.todos.activeFilter === "Active" ? item.completed === false : item.completed === true)
}


export default todosSlice.reducer;
export const {
    // addTodo
    removeTodo,
    // toggleTodo,
    changeActiveFilter,
    clearCompleted } = todosSlice.actions;


