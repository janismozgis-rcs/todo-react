import Axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TaskDetails(props) {
    const [newCommentText, setNewCommentText] = useState('');
    const [task, setTask] = useState({
        loading: true,
        data: null
    });


    useEffect(() => {
        loadTask();
    }, [props.id]);

    const loadTask = async () => {
        const url = 'http://mozgis.me:3001/tasks/' + props.id
        try {
            const response = await Axios.get(url);
            setTask({ loading: false, data: response.data });
        } catch (e) {
            alert('Something went wrong');
            setTask({ loading: false, data: null });

        }
    }

    const deleteComment = async (commentId) => {
        const confirmed = window.confirm('are you sure?');
        const url = `http://mozgis.me:3001/comments/${commentId}/${props.id}`;
        if (confirmed) {
            try {
                await Axios.delete(url);
                loadTask();
            } catch (e) {
                alert('something went wrong');
            }
        }
    }

    const addComment = async () => {
        try {
            const url = `http://mozgis.me:3001/comments`;
            await Axios.post(url, {
                taskId: props.id,
                comment: newCommentText
            });
            setNewCommentText('');
            loadTask();
        } catch (e) {
            alert('Something went wrong');
        }
    }

    const deleteTask = async () => {
        const confirmed = window.confirm('are you sure?');
        if (confirmed) {
            try {   
                const url = `http://mozgis.me:3001/tasks/${props.id}`;
                await Axios.delete(url);
                props.refreshTasks();
            } catch(e) {
                alert('Something went wrong')
            }
        }
    }



    let content = '';
    if (task.loading) {
        content = <h3>Loading...</h3>
    } else if (!task.loading && task.data) {
        let deleteButton = '';
        if (task.data.isCompleted) {
            deleteButton = <button onClick={deleteTask} className="btn btn-sm btn-danger float-right">
                <FontAwesomeIcon icon={faTrash} /> Delete task
            </button>
        }

        let formattedComments = '';
        if (task.data.comments.length > 0) {
            formattedComments = task.data.comments.map((comment) => {
                return (
                    <div>
                        <div>
                            <strong>{comment.createdAt}</strong>
                            <button
                                className="btn btn-sm btn-danger float-right"
                                onClick={() => { deleteComment(comment.id) }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        <p>{comment.comment}</p>
                    </div>
                )
            });
        } else {
            formattedComments = <h6>No comments yet</h6>
        }

        content = (
            <div>
                <h5>Description</h5>
                {deleteButton}
                <p>
                    {task.data.description || 'No description provided'}
                </p>
                <h5>Comments</h5>
                {formattedComments}
                <h5>Add comment</h5>
                <textarea value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} className="form-control"></textarea>
                <button onClick={addComment} className="btn btn-primary mt-3">Add comment</button>
            </div>
        )
    } else {
        content = <h5>Could not load task</h5>
    }

    return (
        <div>
            {content}
        </div>
    )
}
