import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Stories from './Stories';

function Latest({translate}) {

    const [stories, setStories] = useState(null);

    const fetchStories = () => {
        fetch(`${endpoint}/stories/list/latest`)
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(() => setStories([]))
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <section className='latest'>
            <h3>{translate('latest')}</h3>
            <Stories stories={stories} />
        </section>
    )
}

export default Latest
