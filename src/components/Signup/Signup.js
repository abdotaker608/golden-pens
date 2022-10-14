import React from 'react';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';
import SignupForm from './SignupForm';
import {Redirect} from 'react-router-dom';

function Signup() {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const bgImg = require(`../../static/images/${lang === 'ar' ? 'singleBgR.svg' : 'singleBg.svg'}`).default;
    const bgPosition = lang === 'ar' ? 'right' : 'left';


    if (user) return <Redirect to='/dashboard' />

    return (
        <section className='signup' style={{backgroundImage: `url("${bgImg}")`, backgroundPosition: bgPosition}}>
            <div className='content'>
                <img src={require('../../static/images/welcome.svg').default} alt='Welcome' />
            </div>
            <SignupForm translate={translateWrapper} />
        </section>
    )
}

export default Signup
