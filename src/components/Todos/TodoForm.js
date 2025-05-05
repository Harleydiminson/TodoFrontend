import { useState } from 'react';
import styles from './TodoForm.module.css';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  function onSubmitHandler(e) {
    e.preventDefault();
    addTodo(text);
    setText('');
   }

  return (
    <div className={styles.todoForm}>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          placeholder='Enter your task'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default TodoForm;