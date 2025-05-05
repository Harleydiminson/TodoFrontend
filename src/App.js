import { useEffect, useState } from 'react';
import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import Today from './components/Todos/Today';
import style from './App.module.css';

const API_URL = 'https://todo-serverless-xi.vercel.app/api';

function App() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(API_URL)
                setTodos(await res.json())
                console.log();
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const addTodoHandler = (text) => {
        const newTask = {
            username: 'Dima',
            task: text,
            isCompleted: false,
            id: null
        }
        try {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
                .then(res => res.json())
                .then(data => {
                    setTodos([...todos, data.todo]);
                })
        } catch (error) {
            console.log('Error:', error);
        }
    }
    // delete handler
    const onDeleteHandler = (id) => {
        console.log(`${API_URL}?id=${id}`);
        try {
            fetch(`${API_URL}?id=${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const onCheckHandler = (id) => {
        const currentTodo = todos.find(todo => todo.id === id);
        if (!currentTodo) return;

        const updatedCompleted = !currentTodo.completed;

        try {
            fetch(`${API_URL}?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: updatedCompleted })
            })
                .then(res => res.json())
                .then(data => {
                    const updatedTask = data.updatedTask;
                    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: updatedTask.completed } : { ...todo }));
                })
        }
        catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className={style.app}>
            <div className={style.container}>
                <h2 className={style.title}>Welcome to the To-do list App</h2>
                <Today />
                <TodoForm addTodo={addTodoHandler} />
                <TodoList todos={todos} deleteTodo={onDeleteHandler} checkTodo={onCheckHandler} />
            </div>
        </div>
    );
}

export default App;