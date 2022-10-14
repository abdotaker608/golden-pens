import React, {useEffect, useState} from 'react';
import Stories from '../Dashboard/Stories';
import SA from '../Dashboard/SA';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import {endpoint} from '../../API';


function TopStories({profile, translate}) {

    const [stories, setStories] = useState(null);
    const [error, setError] = useState();

    const fetchStories = () => {
        fetch(`${endpoint}/stories/list/${profile.pk}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    if (data.length === 0) setError('noEntry');
                    else setStories(data);
                }
            })
            .catch(() => setError('failFetch'));
    }

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <div className='mt-5'>
            {
                stories && !error ?
                <React.Fragment>
                    <Stories stories={stories} />
                    <SA path={`/stories/author/${profile.pk}`} />
                </React.Fragment>
                :
                <FetchPreloader error={translate(error)} minHeight='200px'/>
            }
        </div>

    )
}

export default TopStories
