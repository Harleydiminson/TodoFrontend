import Todo from "./Todo";
import style from './TodoList.module.css';

function TodoList({ todos, deleteTodo, checkTodo }) {
  return (
    <div className={style.todoListContainer}>
      {todos.map((todo) => (<Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
      />))}
    </div>
  )
}

export default TodoList;