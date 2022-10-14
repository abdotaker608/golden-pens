import React, {useState, useEffect} from 'react';
import Header from './Header';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import {setUpIntersectionObserver} from '../../Js/methods';
import ReadersHome from './ReadersHome';
import WritersHome from './WritersHome';
import {Redirect} from 'react-router-dom';

function Home() {

    const [showKey, setShowKey] = useState('');

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang)

    useEffect(() => {
        if (document.querySelector('section')) document.querySelector('section:first-of-type').scrollIntoView({behavior: 'smooth', block: 'center'});

        if (showKey) document.querySelector('footer').style.display = 'initial';
    }, [showKey])

    useEffect(() => {
        document.querySelector('footer').style.display = 'none';
    }, [])

    if (user) return <Redirect to='/dashboard' />

    return (
        <React.Fragment>
            <Header setShowKey={setShowKey} translate={translateWrapper}/>
            {showKey === 'reader' && <ReadersHome translate={translateWrapper} setUpIntersectionObserver={setUpIntersectionObserver}/> }
            {showKey === 'writer' && <WritersHome translate={translateWrapper} setUpIntersectionObserver={setUpIntersectionObserver}/> }
        </React.Fragment>
    )
}

export default Home
