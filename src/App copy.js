import { useEffect, useState } from 'react';
import { RiDeleteBin2Line, RiTodoFill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import './App.css';

const API_URL = 'http://localhost:3000/api';

function App() {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([]);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(API_URL)
                const data = await res.json()
                setTodos(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
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
                    setTodos([...todos, { ...newTask, id: data.id }]);
                    setText('');
                })
        }
        catch (error) {
            console.log('Error:', error);
        }
    }
    // delete handler
    const onDeleteHandler = (id) => {
        const deleteTodo = { id: id }
        console.log(deleteTodo);
        try {
            fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deleteTodo)
            })
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const onCheckHandler = (todo) => {
        setTodos(todos.map(t =>
            t.id === todo.id
                ? { ...t, completed: !t.completed }
                : { ...t }
        ));
        try {
            fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })

        }
        catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className="App">
            <div className='container'>
                <h2>Welcome to the To-do list App</h2>
                <button onClick={toggleTheme}>
                    Switch to {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Theme
                </button>
                <h1>To-do list App</h1>
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
                <ul className='todoList'>
                    {!todos.length && <p>Todo list is empty</p>}
                    {todos.map((todo) => (
                        <li className='todoItem' key={todo.id}>
                            <div className='leftBlock'>
                                <RiTodoFill className='todoIcon' />
                                <span>{todo.task}</span>
                            </div>
                            <div className='rightBlock'>
                                <RiDeleteBin2Line className='deleteIcon' onClick={() => onDeleteHandler(todo.id)} />
                                <FaCheck className='checkIcon' onClick={() => onCheckHandler(todo)} />
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default App;