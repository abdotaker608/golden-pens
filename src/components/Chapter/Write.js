import React, {useEffect, useState} from 'react';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';
import NotAllowed from '../NotAllowed/NotAllowed';
import InfoForm from './InfoForm';


function Write({match, chapter={}, method='POST', displayValue=''}) {

    const [story, setStory] = useState(null);
    const [error, setError] = useState('');

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const fetchStory = () => {
        fetch(`${endpoint}/stories/update/${match.params.story}`, {
            headers: {
                'Authorization': `Token ${user.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) setStory(data);
            })
            .catch(() => setError('failFetch'))
    }

    useEffect(() => {
        if (user && method == 'POST') fetchStory();
    }, [user])

    if(!user) return <NotAllowed />

    if (story && story.author !== user.pk) return <Redirect to='/write/new' />

    return (
        <div className='write-nc'>
            {
                story || chapter.story ?
                <div className='nc text-center'>
                    <h2 className='text-capitalize font-weight-bold'>{story ? story.title : chapter.story.title}</h2>
                    <InfoForm story={story} translate={translateWrapper} lang={lang} authToken={user.token} chapter={chapter} displayValue={displayValue} method={method}/>
                </div>
                :
                <FetchPreloader error={translateWrapper(error)}/>
            }
        </div>
    )
}

export default Write
