import React from 'react';
import Img from '../../static/images/writingSmurf.svg';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';

function About() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    return (
        <div className='about animate__animated animate__fadeIn'>
            <div className='content'>
                <h2>{translateWrapper('about')}</h2>
                <p>{translateWrapper('aboutP1')}</p>
                <p>{translateWrapper('aboutP2')}</p>
            </div>
            <img src={Img} alt='Author Writing...' />
        </div>
    )
}

export default About
