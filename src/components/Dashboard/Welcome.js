import React from 'react';
import {Link} from 'react-router-dom';

function Welcome({translate, user}) {

    const buttons = [
        {path: '/write/new', title: translate('newStory'), bg: 'rgb(250, 195, 57)'},
        {path: '/saved', title: translate('savedStories'), bg: 'rgb(49, 115, 202)'}
    ]

    return (
        <section className='welcome'>
            <h2>{translate('welcome')} {user.first_name}</h2>
            <div className='btn-container mt-5'>
                {
                    buttons.map(button => (
                        <Link to={button.path} key={button.path}>
                            <button style={{background: button.bg}}>{button.title}</button>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default Welcome
