import React from 'react';
import MobNav from './MobNav';
import PcNav from './PcNav';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';

function Nav() {

    const user = useSelector(state => state.auth);

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const loggedOutLinks = [
        {path: '/', name: translateWrapper('home'), icon: 'fas fa-home fa-lg'},
        {path: '/about', name: translateWrapper('about'), icon: 'fas fa-users fa-lg'},
        {path: '/exhibition', name: translateWrapper('exhibition'), icon: 'fas fa-book fa-lg'},
        {path: '/authors', name: translateWrapper('authors'), icon: 'fas fa-user-tag fa-lg'},
        // {path: '/contact', name: translateWrapper('contact'), icon: 'fas fa-at fa-lg'},
        {path: '/saved', name: translateWrapper('savedStories'), icon: 'fas fa-save fa-lg'},
    ]

    const loggedOutAuthLinks = [
        {path: '/login', name: translateWrapper('login'), icon: 'fas fa-sign-in-alt fa-lg', bg: 'rgb(49, 115, 202)'},
        {path: '/signup', name: translateWrapper('signup'), icon: 'fas fa-user-plus fa-lg', bg: 'rgb(250, 195, 57)'},
    ]

    const loggedInLinks = [
        {path: '/dashboard', name: translateWrapper('dashboard'), icon: 'fas fa-house-user fa-lg'},
        {path: '/about', name: translateWrapper('about'), icon: 'fas fa-users fa-lg'},
        {path: '/exhibition', name: translateWrapper('exhibition'), icon: 'fas fa-book fa-lg'},
        {path: `/profile/${user ? user.pk : ''}`, name: translateWrapper('profile'), icon: 'fas fa-user-circle fa-lg'},
        {path: '/authors', name: translateWrapper('authors'), icon: 'fas fa-user-tag fa-lg'},
        // {path: '/contact', name: translateWrapper('contact'), icon: 'fas fa-at fa-lg'},
        {path: '/saved', name: translateWrapper('savedStories'), icon: 'fas fa-save fa-lg'},
    ]

    const loggedInAuthLinks = [
        {path: '/settings', name: translateWrapper('settings'), icon: 'fas fa-cogs fa-lg', bg: 'rgb(49, 115, 202)'},
        {path: '/logout', name: translateWrapper("logout"), icon: 'fas fa-sign-out-alt fa-lg', bg: 'rgb(237, 43, 75)'}
    ]
    
    return (
        <React.Fragment>
            <MobNav links={user ? loggedInLinks : loggedOutLinks} authLinks={user ? loggedInAuthLinks : loggedOutAuthLinks}/>
            <PcNav links={user ? loggedInLinks : loggedOutLinks} authLinks={user ? loggedInAuthLinks : loggedOutAuthLinks}/>
        </React.Fragment>
    )
}

export default Nav
