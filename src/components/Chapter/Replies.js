import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import Comment from '../Comment/Comment';

function Replies({chapter, newComment, translate}) {

    const [comments, setComments] = useState(null);
    const [next, setNext] = useState(`${endpoint}/stories/chapter/${chapter.id}/replies`);
    const [error, setError] = useState('');


    const fetchComments = () => {
        fetch(next)
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    if (comments) setComments([...comments, ...data.results]);
                    else setComments(data.results)
                    setNext(data.next);
                    return;
                }
                setError('failFetch');
            })
            .catch(() => setError('failFetch'))
    }

    useEffect(() => {
        fetchComments();
    }, [])

    useEffect(() => {
        if (newComment) {
            setComments([newComment, ...comments]);
        }
    }, [newComment])

    const editComment = (id, editing=true, content='') => {
        const newComments = [...comments];
        let targetComment = newComments.find(comment => comment.id === id);
        targetComment.editing = editing;
        if (content) targetComment.content = content;
        setComments(newComments);
    }

    const deleteComment = id => {
        setComments(comments.filter(comment => comment.id !== id));
    }

    return (
        <React.Fragment>
            {
                (comments && !error) ?
                <React.Fragment>
                    <div className='replies-container'>
                        {
                            comments.map(comment => (
                                <Comment comment={comment} key={comment.id} editComment={editComment} deleteComment={deleteComment}/>
                            ))
                        }
                    </div>
                    {
                        next &&
                        <div className='d-flex align-items-center s-m' onClick={fetchComments}>
                            <span>{translate('seeMore')}</span>
                            <span className='mx-2 mt-1 d-block'><i className='fas fa-chevron-down' /></span>
                        </div>
                    }
                </React.Fragment>
                :
                <FetchPreloader error={translate(error)} />
            }
        </React.Fragment>

    )
}

export default Replies
