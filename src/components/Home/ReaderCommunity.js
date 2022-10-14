import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function ReaderCommunity({translate, setUpIntersectionObserver}) {

    const animateSection = section => {
        section.style.opacity = 1;
        section.querySelector('h2').classList.add('animate__animated', 'animate__fadeInUp');
        section.querySelector('p').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelector('button').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelector('img').style.transform = 'scale(1)';
    }

    useEffect(() => {
        setUpIntersectionObserver(animateSection, document.querySelector('section.reader-comm'));
    }, [])


    return (
        <section className='reader-comm home-section'>
            <div className='content'>
                <h2>{translate('join')}</h2>
                <p>{translate('join_paragraph')}</p>
                <Link to='/signup'><button>{translate('join_exc')}</button></Link>
            </div>
            <img src={require('../../static/images/connections.png').default} alt='Readers Network' />
        </section>
    )
}

export default ReaderCommunity
