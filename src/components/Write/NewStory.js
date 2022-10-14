import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import NotAllowed from '../NotAllowed/NotAllowed';
import {translate} from '../../Js/methods';
import CoverForm from './CoverForm';
import InfoForm from './InfoForm';

function NewStory() {

    const [cover, setCover] = useState(null);

    const user = useSelector(state => state.auth);
    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    if (!user) return <NotAllowed />

    return (
        <div className='new-story'>
            <div className='main-builder position-relative'>
                <CoverForm translate={translateWrapper} cover={cover} setCover={setCover}/>
                <InfoForm translate={translateWrapper} lang={lang} cover={cover} user={user}/>
            </div>
        </div>
    )
}

export default NewStory
