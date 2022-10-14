import React from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import NotAllowed from '../NotAllowed/NotAllowed';
import Welcome from './Welcome';
import Latest from './Latest';
import Trending from './Trending';
import YourStories from './YourStories';
import Following from './Following';

function Dashboard() {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    if (!user) return <NotAllowed />

    return (
        <div className='dashboard'>
            <Welcome translate={translateWrapper} user={user} />
            <Latest translate={translateWrapper}/>
            <Trending translate={translateWrapper} />
            <Following translate={translateWrapper} user={user}/>
            <YourStories translate={translateWrapper} user={user}/>
        </div>
    )
}

export default Dashboard
