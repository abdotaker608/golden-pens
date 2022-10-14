import React from 'react';
import LoginForm from './LoginForm';
import {useSelector} from 'react-redux';
import { translate } from '../../Js/methods';
import {Redirect} from 'react-router-dom';

function Login() {

    const user = useSelector(state => state.auth);
    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    if (user) return <Redirect to='/dashboard' />

    return (
        <section className='login'>
            <LoginForm translate={translateWrapper} />
        </section>
    )
}

export default Login
