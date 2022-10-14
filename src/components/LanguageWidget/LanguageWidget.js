import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import LanguageSelector from './LanguageSelector';


function LanguageWidget() {

    const lang = useSelector(state => state.lang);

    const [selectorOpened, setSelectorOpened] = useState(false);

    const iconsMap = {
        'ar': 'sa-flag.svg',
        'en': 'uk-flag.svg'
    }

    const namesMap = {
        'ar': 'العربية',
        'en': 'English (U.S)'
    }

    useEffect(() => setSelectorOpened(false), [lang])

    return (
        <React.Fragment>
            <div className='lang-widget d-flex align-items-center justify-content-center' onClick={() => setSelectorOpened(!selectorOpened)} data-testid='lang-widget-test'>
                <img src={require(`../../static/icons/${iconsMap[lang]}`).default} alt={lang} />
                <h6>{namesMap[lang]}</h6>
            </div>
            <CSSTransition classNames='slide' timeout={250} unmountOnExit in={selectorOpened}>
                <LanguageSelector lang={lang} />
            </CSSTransition>
        </React.Fragment>
    )
}

export default LanguageWidget
