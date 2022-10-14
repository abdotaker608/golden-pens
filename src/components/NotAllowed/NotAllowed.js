import React from 'react';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function NotAllowed() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    return (
        <div className='not-allowed'>
            <div className='box'>
                <h5>{translateWrapper('loginRequired')}</h5>
                <Link to='/login'><button>{translateWrapper('login')}</button></Link>
            </div>
        </div>
    )
}

export default NotAllowed
