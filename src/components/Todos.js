import { useState, useEffect } from 'react';
import Todo from './Todo';
import axios from 'axios';

export default function Todos(props) {
    const [todos, setTodos] = useState({
        data: [],
        loading: true
    });
    const url = 'http://localhost:3001/tasks'

    const loadTodos = async () => {
        try {
            const response = await axios.get(url);
            setTodos({
                data: response.data,
                loading: false,
            });
        } catch(e) {
            alert('Whoops, something went wrong');
            setTodos({
                data: [],
                loading: false,
            });
        }
    }

    useEffect(() => {
        loadTodos();

    }, [props.num])


    let content = ''

    if (todos.loading) {
        content = <h3>Loading...</h3>
    }else if (todos.data.length == 0) {
        content = <h3>No tasks so far. Please add some.</h3>

    } else {
        const todoElements = todos.data.map((todo, index) => {
            return <Todo todo={todo} key={index} refreshTasks={loadTodos} />
        });
    
        content = (
            <ul className="list-group">
                {todoElements}
            </ul>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}
