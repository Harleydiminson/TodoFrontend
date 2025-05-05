import { RiDeleteBin2Line, RiTodoFill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';

function Todo({ todo, deleteTodo, checkTodo }) {
  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completedTodo : ''}`}>
      <RiTodoFill className={styles.todoIcon} />
      <span className={styles.todoText}>{todo.task}</span>
      <RiDeleteBin2Line className={styles.deleteIcon} onClick={() => deleteTodo(todo.id)} />
      <FaCheck className={styles.checkIcon} onClick={() => checkTodo(todo.id)} />
    </div>
  );
}

export default Todo;