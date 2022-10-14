import React, {useEffect, useRef} from 'react';
import Type from 'react-typed';

function WritePreview({translate, setUpIntersectionObserver}) {

    const typedRef = useRef(null);

    const animateSection = section => {
        section.style.opacity = 1;
        setTimeout(() => typedRef.current.typed.start(), 1000);
        section.querySelector('.content h2').classList.add('animate__animated', 'animate__fadeInUp');
        section.querySelector('.content p').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelector('.story-head img').style.opacity = 1;
        section.querySelector('.story-head img').style.transform = 'translateY(0)';
        section.querySelector('.story-head h4').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelectorAll('.tags-container .tag').forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = 1;
                tag.style.top = 0;
            }, index * 200)
        });
    }

    useEffect(() => {
        setUpIntersectionObserver(animateSection, document.querySelector('section.write-preview'));
    }, [])


    return (
        <section className='write-preview home-section'>
            <div className='content'>
                <h2>{translate('easy_use_title')}</h2>
                <p>{translate('easy_use_paragraph')}</p>
            </div>
            <div className='preview' dir='ltr' >
                <div className='story-head'>
                    <img src={require('../../static/images/horrorCover.jpg').default} alt='Horror Story Cover' />
                    <div className='content'>
                        <h4>Kind Strangers</h4>
                        <div className='tags-container'>
                            <span className='tag'>Horror</span>
                            <span className='tag'>Spirit</span>
                        </div>
                    </div>
                </div>
                <div className='type-preview mt-3'>
                    <Type strings={['It was a dark and scary night, A little girl was walking alone on her way to home when she suddenly heard footsteps following her. She turned around and...']} typeSpeed={20} stopped={true} ref={typed => typedRef.current = typed}/>
                </div>
            </div>
        </section>
    )
}

export default WritePreview
