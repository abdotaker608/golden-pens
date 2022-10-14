import React from 'react';
import NotFoundImg from '../../static/images/404.svg';

function NotFound() {
    return (
        <div className='not-found text-center pt-5'>
            <img src={NotFoundImg} alt='404 NOT FOUND' style={{width: '90%', height: 'auto', maxWidth: '768px'}}/>
        </div>
    )
}

export default NotFound
