import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import Menu from './Menu';
import {useHistory} from 'react-router-dom';

function MobNav({links, authLinks}) {

    const [menuOpened, setMenuOpened] = useState(false);

    const history = useHistory();

    const animateMenuOpening = () => {
        let firstBar = document.querySelector('.burger-icon span:first-child');
        let secondBar = document.querySelector('.burger-icon span:nth-child(2)');
        let lastBar = document.querySelector('.burger-icon span:last-child');

        firstBar.style.transform = 'translateY(-50%) rotate(45deg)';
        secondBar.style.visibility = 'hidden';
        lastBar.style.transform = 'translateY(-50%) rotate(-45deg)';
    }

    const animateMenuClosing = () => {
        let firstBar = document.querySelector('.burger-icon span:first-child');
        let secondBar = document.querySelector('.burger-icon span:nth-child(2)');
        let lastBar = document.querySelector('.burger-icon span:last-child');

        firstBar.style.transform = 'translateY(-300%)';
        secondBar.style.visibility = 'visible';
        lastBar.style.transform = 'translateY(200%)';
    }

    useEffect(() => {
        if (menuOpened) animateMenuOpening();
        else animateMenuClosing();
    }, [menuOpened])

    useEffect(() => {
        const unlisten = history.listen(() => {
            setMenuOpened(false);
            window.scrollTo(0, 0);
        });
        return unlisten;
    }, [])

    return (
        <nav className='mob-nav px-4 py-3' data-testid='mob-nav-test'>
            <img src={require('../../static/icons/logo.svg').default} alt='Golden Pens Logo' />
            <div className='burger-icon' onClick={() => setMenuOpened(!menuOpened)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <CSSTransition classNames='slide' timeout={250} unmountOnExit in={menuOpened}>
                <Menu links={links} authLinks={authLinks}/>
            </CSSTransition>
        </nav>
    )
}

export default MobNav
