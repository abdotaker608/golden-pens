import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {useSelector} from 'react-redux';


function Dropdown({items}) {

    const [toggled, setToggled] = useState(false);

    const lang = useSelector(state => state.lang);

    return (
        <div className='drop-down'>
            <span className='ellp' onClick={() => setToggled(!toggled)}><i className='fas fa-ellipsis-v fa-lg'/></span>
            <CSSTransition in={toggled} timeout={250} unmountOnExit classNames='slide'>
                <div className='items-container' style={lang === 'ar' ? {left: '5px'} : {right: '5px'}}>
                    {items}
                </div>
            </CSSTransition>
        </div>
    )
}

export default Dropdown
