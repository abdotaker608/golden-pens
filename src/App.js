import React, {useEffect} from 'react';
import './styles/bootstrap.min.css';
import './styles/main.css';
import 'animate.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import {authenticateJwt, triggerLoaded} from './Js/actionCreators';
import {useDispatch, useSelector} from 'react-redux';
import Nav from './components/Nav/Nav';
import LanguageWidget from './components/LanguageWidget/LanguageWidget';
import Preloader from './components/Preloader/Preloader';
import {CSSTransition} from 'react-transition-group';

function App() {

  const dispatch = useDispatch();

  const lang = useSelector(state => state.lang);
  const loading = useSelector(state => state.preload)

  useEffect(() => {
    //check if there is a jwt key in the cache to authenticate it at the server
    const token = window.localStorage.getItem('__eupk');
    if (token) dispatch(authenticateJwt(token));
    else dispatch(triggerLoaded())
  }, [])

  return (
    <div className="App" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{fontFamily: `${lang === 'ar' ? 'Tajawal' : 'Lato'}, sans-serif`}}>
      <Router>
        <Nav />
        <Routes />
        <LanguageWidget />
      </Router>
      <CSSTransition in={loading} timeout={250} classNames='fade' unmountOnExit>
        <Preloader />
      </CSSTransition>
    </div>
  );
}

export default App;
