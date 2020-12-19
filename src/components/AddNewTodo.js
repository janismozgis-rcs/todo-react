import Axios from 'axios';
import { useState } from 'react';

export default function AddNewTodo(props) {
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const url = 'http://mozgis.me:3001/tasks'

    const saveTask = async () => {
        setSaving(true);
        setErrors([]);
        if (title == '') {
            setErrors(['Title is required']);
            setSaving(false);
        }
        try {
            await Axios.post(url, {
                title,
                description,
                labels: [],
            });
            setSaving(false);
            setTitle('');
            setDescription('');
            props.todoAdded();

        } catch (e) {
            alert('Something went wrong');
            setSaving(false);
        }
    }

    const saveButtonText = saving ? 'Adding todo...' : 'Add todo';

    let errorsWrapper = '';
    if (errors.length > 0) {
        errorsWrapper = (
            <div className="alert alert-danger">
                <ul>
                    {errors.map((error) => <li>{error}</li>)}
                </ul>
            </div>
        )
    }


    return (
        <div className="row">
            <div className="col-12 mt-5">
                <h4>Add new Todo</h4>
                {errorsWrapper}

            </div>

            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="new-task-title">Title</label>
                    <input type="text" className="form-control" id="new-task-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="new-task-title">Description</label>
                    <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-success btn-inverse" onClick={saveTask} disabled={saving}>{saveButtonText}</button>
                </div>
            </div>
        </div>
    )
}
