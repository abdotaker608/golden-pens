import React from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';

function Privacy() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const policies = [
        {title: translateWrapper('personalInfo'), content: translateWrapper('personalInfoDesc'), id: 'personal-info'},
        {title: translateWrapper('third-party'), content: translateWrapper('tpDesc'), id: 'third-party'},
        {title: translateWrapper('socialPresence'), content: translateWrapper('spDesc'), id: 'social-presence'},
        {title: translateWrapper('servingADS'), content: translateWrapper('ADSDesc'), id: 'ads'},
        {title: translateWrapper('copyright'), content: translateWrapper('crDesc'), id: 'copyright'},
        {title: translateWrapper('deleteAcc'), content: translateWrapper('daDesc'), id: 'delete-account'},
    ]

    return (
        <div className='policy-page animate__animated animate__fadeIn'>
            <h2 className='text-center font-weight-bold'>{translateWrapper('policy')}</h2>
            <div className='policies'>
                {
                    policies.map(policy => (
                        <div className='policy' key={policy.id} id={policy.id}>
                            <h3>{policy.title}</h3>
                            <p>{policy.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Privacy
