import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import NotAllowed from '../NotAllowed/NotAllowed';
import {translate} from '../../Js/methods';
import CoverForm from './CoverForm';
import InfoForm from './InfoForm';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';

function EditStory({match}) {

    const [cover, setCover] = useState(null);
    const [story, setStory] = useState({});
    const [error, setError] = useState(false);

    const user = useSelector(state => state.auth);
    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    
    const fetchStory = () => {
        fetch(`${endpoint}/stories/overview/${match.params.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setStory(data);
                    setCover(data.cover);
                    return;
                }
                setError(true);
            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        if (user) fetchStory();
    }, [user])

    if (!user) return <NotAllowed />

    if (error || (story.author && user.pk !== story.author.user.pk)) return <Redirect to='/write/new' />

    return (
        <div className='new-story'>
            <div className='main-builder position-relative'>
                <CoverForm translate={translateWrapper} cover={cover} setCover={setCover}/>
                <InfoForm translate={translateWrapper} lang={lang} cover={cover} user={user} story={story} cat={story.category} tagList={story.author ? story.tags : []} method='PUT'/>
            </div>
        </div>
    )
}

export default EditStory
