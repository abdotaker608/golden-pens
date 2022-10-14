import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import Paginator from '../Paginator/Paginator';
import StoryCover from './StoryCover';

function Stories({translate, config, lang, changeConfig}) {

    const [stories, setStories] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(true);

    const fetchStories = () => {
        setFetching(true);
        setError('');
        let url = `${endpoint}/stories/list?`;
        for (let [key, value] of Object.entries(config)) {
            if (value) url += `${key}=${value}&`;
        }
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setFetching(false);
                if (data.results && data.results.length >= 1) {
                    setStories(data.results);
                    setTotal(data.total);
                    setError('');
                }
                else if (data.results.length < 1) {
                    setError('noMatch');
                }
            })
            .catch(() => {
                setFetching(false);
                setError('failFetch');
            })
    }

    const handlePageChange = page => changeConfig('page', page.selected + 1);


    useEffect(() => {
        fetchStories();
    }, [config])

    return (
        <div className='stories-container'>
            <div className='stories'>
                {
                    (!fetching && !error) ?
                    stories.map(story => (
                        <StoryCover story={story} key={story.id}/>
                    ))
                    :
                    <div className='w-100'>
                        <FetchPreloader error={translate(error)} />
                    </div>
                }
            </div>
            <div style={{display: (fetching || error) ? 'none' : 'initial', fontFamily: 'Lato'}}>
                <Paginator total={total} lang={lang} handleChange={handlePageChange}/>
            </div>
        </div>
    )
}

export default Stories
