import React from 'react';
import ADS from '../ADS/ADS';
import Read from './Read';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';

function Chapter({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    return (
        
        <div className='story-page'>
            <div className='story-container'>
                {/* <div className='w-100 d-flex align-items-center flex-column ads-cont'>
                    <ADS />
                    <ADS />
                </div> */}
                <Read id={match.params.id} translate={translateWrapper} user={user} lang={lang}/>
                {/* <div className='w-100 d-flex align-items-center flex-column ads-cont'>
                    <ADS />
                    <ADS />
                </div> */}
            </div>
        </div>
    )
}

export default Chapter
