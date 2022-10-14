import React, {useState, useEffect} from 'react';
import Stories from '../Dashboard/Stories';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';

function Saved() {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const [stories, setStories] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(window.localStorage.getItem('__psvd'));
        if (saved) setStories(saved);
        else setStories([]);
    }, [])

    const removeFromSaved = id => {
        const newStories = stories.filter(story => story.id !== id);
        setStories(newStories);
        window.localStorage.setItem('__psvd', JSON.stringify(newStories));
    }

    return (
        <div className='saved' style={{paddingTop: '80px'}}>
            <h2 className='font-weight-bold text-center'>{translateWrapper('savedStories')}</h2>
            <Stories stories={stories} rm={removeFromSaved}/>
        </div>
    )
}

export default Saved
