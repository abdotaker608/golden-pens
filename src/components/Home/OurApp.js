import React, {useEffect} from 'react';

function OurApp({translate, setUpIntersectionObserver}) {

    const steps = [
        {icon: 'fas fa-cogs fa-2x', color: 'secondary', text: translate('install')},
        {icon: 'fas fa-wifi fa-2x', color: 'danger', text: translate('use_offline')},
        {icon: 'fas fa-star fa-2x', color: 'warning', text: translate('read_saved')}
    ]

    const animateSection = section => {
        section.style.opacity = 1;
        section.querySelector('h2').classList.add('animate__animated', 'animate__fadeIn');
        section.querySelectorAll('.step').forEach(step => step.classList.add('animate__animated', 'animate__fadeInUp'));
    }

    useEffect(() => {
        setUpIntersectionObserver(animateSection, document.querySelector('section.our-app'));
    }, [])

    return (
        <section className='our-app home-section'>
            <h2>{translate('our-app')}</h2>
            <div className='steps-container'>
                {
                    steps.map(step => (
                        <div className='step' key={step.color}>
                            <span className={`text-${step.color}`}><i className={step.icon} /></span>
                            <p>{step.text}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default OurApp
