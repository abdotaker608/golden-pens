import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import Stories from './Stories';

function Trending({translate}) {

    const [stories, setStories] = useState(null);

    const fetchStories = () => {
        fetch(`${endpoint}/stories/list/trending`)
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(() => setStories([]))
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <section className='trending'>
            <h3>{translate('trending')}</h3>
            <Stories stories={stories} />
        </section>
    )
}

export default Trending
