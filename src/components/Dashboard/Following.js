import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Stories from './Stories';

function Following({translate, user}) {

    const [stories, setStories] = useState(null);

    const fetchStories = () => {
        fetch(`${endpoint}/stories/list/follow/${user.pk}`)
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(() => setStories([]))
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <section className='yours'>
            <h3>{translate('following')}</h3>
            <Stories stories={stories} />
        </section>
    )
}

export default Following
