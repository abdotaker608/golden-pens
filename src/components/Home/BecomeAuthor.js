import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function BecomeAuthor({translate, setUpIntersectionObserver}) {

    const animateSection = section => {
        section.style.opacity = 1;
        section.querySelector('h2').classList.add('animate__animated', 'animate__fadeInUp');
        section.querySelector('p').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelector('button').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelector('img').style.transform = 'scale(1)';
    }

    useEffect(() => {
        setUpIntersectionObserver(animateSection, document.querySelector('section.become-author'));
    }, [])

    return (
        <section className='become-author home-section'>
            <div className='content'>
                <h2>{translate('become_author_title')}</h2>
                <p>{translate('become_author_paragraph')}</p>
                <Link to='/signup'><button>{translate('start_writing')}</button></Link>
            </div>
            <img src={require('../../static/images/writing.svg').default} alt='Writing' />
        </section>
    )
}

export default BecomeAuthor
