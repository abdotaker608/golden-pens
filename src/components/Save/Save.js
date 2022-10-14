import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Chapter from '../Chapter/Chapter';
import StoryOverview from '../Story/StoryOverview';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import {useHistory} from 'react-router-dom';

function Save({match}) {

    const user = useSelector(state => state.auth);
    const lang = useSelector(state => state.lang);
    
    const translateWrapper = text => translate(text, lang);

    const [message, setMessage] = useState('saving');
    const [fetched, setFetched] = useState(null);
    const [story, setStory] = useState();

    const history = useHistory();

    const saveChapters = async chapters => {
        for (let chapter of chapters) {
            let url = `${endpoint}/stories/chapters/${chapter}`;
            let repliesUrl = `${endpoint}/stories/chapter/${chapter}/replies`;
            let fetchUrl = url;
            if (user) fetchUrl += `?user=${user.pk}`;
            await fetch(fetchUrl);
            fetch(repliesUrl);
            fetch(url);
        }
        setFetched(true);
    }

    const saveStory = async () => {
        let url = `${endpoint}/stories/overview/${match.params.id}`;
        if (user) url += `?user=${user.pk}`;
        const results = await fetch(url);
        const storyJson = await results.json();
        setStory(storyJson);
        fetch(`${endpoint}/stories/save/${match.params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.chapters) {
                    saveChapters(data.chapters);
                }
                else {
                    setMessage('failFetch');
                }
            })
            .catch(() => {
                setMessage('wentWrong');
            })
    }

    useEffect(() => {
        saveStory();
    }, [])

    useEffect(() => {
        if (fetched) {
            const saved = JSON.parse(window.localStorage.getItem('__psvd'));
            if (saved && Array.isArray(saved)) {
                if (!saved.find(item => item.id === story.id)) {
                    const updatedSaved = [...saved, story]
                    window.localStorage.setItem('__psvd', JSON.stringify(updatedSaved));
                }
            }
            else {
                window.localStorage.setItem('__psvd', JSON.stringify([story]));
            }
            history.push('/saved');
        }
    }, [fetched])

    return (
        <div className='save' style={{padding: '150px 0'}}>
            <h4 className='text-secondary text-center font-weight-bold'>{message == 'saving' && <div className='spinner spinner-border mx-2' />}{translateWrapper(message)}</h4>
        </div>
    )
}

export default Save
