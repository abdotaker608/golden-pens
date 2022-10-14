import React from 'react';
import {useDispatch} from 'react-redux';
import {switchLanguageTo} from '../../Js/actionCreators';


function LanguageSelector({lang}) {

    const dispatch = useDispatch();

    const availableLanguages = [
        {name: 'English (U.S)', key: 'en', icon: 'uk-flag.svg'},
        {name: 'العربية', key: 'ar', icon: 'sa-flag.svg'}
    ]

    const switchLang = (key) => dispatch(switchLanguageTo(key));

    return (
        <ul className='lang-selector'>
            {
                availableLanguages.map(language => (
                    <li key={language.key} className={lang === language.key ? 'active' : ''} onClick={() => switchLang(language.key)}><img src={require(`../../static/icons/${language.icon}`).default} alt={language.key}/><h6>{language.name}</h6></li>
                ))
            }
        </ul>
    )
}

export default LanguageSelector
