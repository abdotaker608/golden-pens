import React, {useEffect} from 'react';

function ManyFields({setUpIntersectionObserver, translate}) {

    const animateSection = section => {
        section.style.opacity = 1;
        section.querySelector('h2').classList.add('animate__animated', 'animate__fadeInUp');
        section.querySelector('p').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelectorAll('img').forEach(img => {
            img.style.transform = 'translateY(0)';
            img.style.opacity = 1;
        })
    }

    useEffect(() => {
        setUpIntersectionObserver(animateSection, document.querySelector('section.many-fields'));
    }, [])

    const covers = ['story1.png', 'story1.jpg', 'story3.jpg', 'story4.jpg', 'story5.jpg', 'story6.jpg'];

    return (
        <section className='many-fields home-section'>
            <div className='content'>
                <h2>{translate('all-in-one')}</h2>
                <p>{translate('all-in-one_paragraph')}</p>
            </div>
            <div className='imgs-container d-flex flex-wrap justify-content-around'>
                    {
                        covers.map((cover, index) => (
                            <img src={require(`../../static/images/${cover}`).default} alt='Cover' key={index}/>
                        ))
                    }
                </div>
        </section>
    )
}

export default ManyFields
