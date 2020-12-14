import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import TaskDetails from './TaskDetails';
import Axios from 'axios';

export default function Todo(props) {
    const [isCompleted, setIscompleted] = useState(props.todo.isCompleted);
    const [isOpen, setIsOpen] = useState(false)

    const completeTask = async (id) => {
        const localIsCompleted = !isCompleted;
        setIscompleted(localIsCompleted)
        try {
            const url = `http://localhost:3001/tasks/complete/${id}`;
            await Axios.patch(url, {
                isCompleted: localIsCompleted,
            });
            props.refreshTasks()
        } catch(e) {
            alert('Something went wrong');
        }
    }

    let title = props.todo.title
    if (isCompleted) {
        title = <del>{props.todo.title}</del>
    }

    let taskDetails = null;
    let detaulsButtonContent = <FontAwesomeIcon icon={faChevronDown} />

    if (isOpen) {
        taskDetails = <TaskDetails id={props.todo._id} refreshTasks={props.refreshTasks} />
        detaulsButtonContent = <FontAwesomeIcon icon={faChevronUp} />
    }

    return (
        <li className="list-group-item">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={'task-checkbox-' + props.todo._id}
                    checked={isCompleted} onChange={() => { completeTask(props.todo._id) }}
                />
                <label className="form-check-label" htmlFor={'task-checkbox-' + props.todo._id}>{title}</label>
                <button 
                    className="btn btn-sm btn-primary float-right"
                    onClick={() => {setIsOpen(!isOpen)}}
                >
                    {detaulsButtonContent}
                </button>
            </div>
            {taskDetails}

        </li>
    )
}
