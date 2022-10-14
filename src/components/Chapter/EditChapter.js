import React, {useState, useEffect} from 'react';
import {endpoint} from '../../API';
import {useSelector} from 'react-redux';
import Write from './Write';
import NotAllowed from '../NotAllowed/NotAllowed';
import {Redirect} from 'react-router-dom';

function EditChapter({match}) {

    const [chapter, setChapter] = useState({});
    const [error, setError] = useState(false);

    const user = useSelector(state => state.auth);
    
    const fetchChapter = () => {
        fetch(`${endpoint}/stories/chapters/${match.params.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) setChapter(data);
                else setError(true);
            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        if(user) fetchChapter();
    }, [user])

    if (!user) return <NotAllowed />

    if (error || (chapter.story && user.pk !== chapter.story.author.user.pk)) return <Redirect to='/write/new' />

    return (
        <div className='edit-chapter'>
            <Write chapter={chapter} method='PUT' displayValue={chapter.content}/>
        </div>
    )
}

export default EditChapter
