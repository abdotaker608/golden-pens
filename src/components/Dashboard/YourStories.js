import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Stories from './Stories';
import SA from './SA';

function YourStories({translate, user}) {

    const [stories, setStories] = useState(null);

    const fetchStories = () => {
        fetch(`${endpoint}/stories/list/${user.pk}`)
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(() => setStories([]))
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <section className='yours'>
            <h3>{translate('yourStories')}</h3>
            <Stories stories={stories} />
            {stories && stories.length > 0 && <SA path={`stories/author/${user.pk}`}/>}
        </section>
    )
}

export default YourStories
