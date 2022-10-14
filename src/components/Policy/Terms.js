import React from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';

function Terms() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const policies = [
        {title: translateWrapper('sexual'), content: translateWrapper('sexualDesc')},
        {title: translateWrapper('violence'), content: translateWrapper('vDesc')},
        {title: translateWrapper('promo'), content: translateWrapper('promoDesc')},
        {title: translateWrapper('copyright'), content: translateWrapper('crTDesc')},
        {title: translateWrapper('spam'), content: translateWrapper('spamDesc')},
        {title: translateWrapper('ambiguity'), content: translateWrapper('ambDesc')},
    ]

    return (
        <div className='terms-page animate__animated animate__fadeIn'>
            <h2 className='text-center font-weight-bold'>{translateWrapper('terms')}</h2>
            <div className='policies'>
                {
                    policies.map((policy, index) => (
                        <div className='policy' key={index}>
                            <h3>{policy.title}</h3>
                            <p>{policy.content}</p>
                        </div>
                    ))
                }
                <h5 className='text-danger font-weight-bold mt-5'>*{translateWrapper('noteBan')}</h5>
            </div>
        </div>
    )
}

export default Terms
