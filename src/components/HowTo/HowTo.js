import React from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import ReportStory from '../../static/images/report.PNG';
import InstallApp from '../../static/images/install.png';

function HowTo() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const howTos = [
        {title: 'reportStory', steps: ['reportStoryS1', 'reportStoryS2', 'reportStoryS3'], img: ReportStory},
        {title: 'installApp', steps: ['installS1', 'installS2', 'installS3', 'installS4'], img: InstallApp},
    ]

    return (
        <div className='how-to animate__animated animate__fadeIn'>
            <h2>{translateWrapper('how')}</h2>
            <div className='how-container'>
                {
                    howTos.map((howTo, idx) => (
                        <div className='how' key={idx}>
                            <div className='content'>
                                <h3>{translateWrapper(howTo.title)}</h3>
                                <ol>
                                    {
                                        howTo.steps.map((step, index) => (
                                            <li key={index}>{translateWrapper(step)}</li>
                                        ))
                                    }
                                </ol>
                            </div>
                            <img src={howTo.img} alt={translateWrapper(howTo.title)} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HowTo
