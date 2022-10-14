import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {translate} from '../../Js/methods';
import Info from './Info';
import Security from './Security';
import Author from './Author';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';
import {updateUser as updateUserPayload} from '../../Js/actionCreators';

function Settings() {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const [currentActive, setCurrentActive] = useState('info');

    const dispatch = useDispatch();

    const translateWrapper = text => translate(text, lang);

    const selectors = [
        {icon: 'fas fa-info-circle fa-lg', name: translateWrapper("info"), key: 'info'},
        {icon: 'fas fa-pen-alt fa-lg', name: translateWrapper("author"), key: 'author'},
        {icon: 'fas fa-lock fa-lg', name: translateWrapper("security"), key: 'security'},
    ]

    const componentsMap = {
        'info': Info,
        'security': Security,
        'author': Author
    }

    const updateUser = payload => dispatch(updateUserPayload(payload));

    const CurrentComponent = componentsMap[currentActive];

    if (!user) return <Redirect to='/' />

    return (
        <section className='settings w-100 mt-0'>
            <div className='settings-container'>
                <div className='selector-container'>
                    {
                        selectors.map(selector => (
                            <div className={`selector ${selector.key === currentActive ? 'active' : ''}`} key={selector.key} onClick={() => setCurrentActive(selector.key)} data-testid={`test-${selector.key}`}>
                                <span className='mx-2'><i className={selector.icon} /></span>
                                <span className='selector-title'>{selector.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='comp-container' style={lang === 'ar' ? {borderRight: '1px solid silver'} : {borderLeft: '1px solid silver'}}>
                    {<CurrentComponent endpoint={endpoint} updateUser={updateUser} translate={translateWrapper} user={user}/>}
                </div>
            </div>
        </section>
    )
}

export default Settings
