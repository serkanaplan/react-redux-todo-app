import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeActiveFilter, selectTodos, selectActiveFilter } from '../redux/todos/todosSlice'
import { clearCompletedTodosAsync} from '../redux/todos/service'

export default function ContentFooter() {
	const items = useSelector(selectTodos)
	const dispatch = useDispatch()
	const activeFilter = useSelector(selectActiveFilter)
	const itemsLeft = items.filter((item) => item.completed === false).length

	useEffect(() => {
		localStorage.setItem('activeFilter', activeFilter)
	}, [activeFilter])

	
	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{itemsLeft} </strong>
				item{itemsLeft > 1 && "s"} left
			</span>
			<ul className="filters">
				<li>
					<a href="#/" className={activeFilter === "All" ? "selected" : ""} onClick={() => dispatch(changeActiveFilter("All"))}>All</a>
				</li>
				<li>
					<a href="#/" className={activeFilter === "Active" ? "selected" : ""} onClick={() => dispatch(changeActiveFilter("Active"))}>Active</a>
				</li>
				<li>
					<a href="#/" className={activeFilter === "Completed" ? "selected" : ""} onClick={() => dispatch(changeActiveFilter("Completed"))}>Completed</a>
				</li>
			</ul>

			<button className="clear-completed" onClick={() => dispatch(clearCompletedTodosAsync({clearCompleted: true}))}>
				Clear completed
			</button>
		</footer>
	)
}
