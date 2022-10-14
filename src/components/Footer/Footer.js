import React from 'react';
import {Link} from 'react-router-dom';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';

function Footer() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const terms = [
        {path: '/policy', name: translateWrapper('policy')},
        {path: '/terms', name: translateWrapper('terms')}
    ]

    const hows = [
        {path: '/usage', name: translateWrapper("how")},
        // {path: '/faq', name: translateWrapper('faq')}
    ]

    const socials = [
        {path: '#', icon: 'fab fa-facebook-f fa-lg', bg: '#0f48a3'},
        {path: '#', icon: 'fab fa-instagram fa-lg', bg: '#f54cac'},
        {path: '#', icon: 'fab fa-twitter fa-lg', bg: '#44cee3'}
    ]

    return (
        <footer className='text-capitalize'>
            <div className='row gy-2'>
                <ul className='p-0 col-12 col-sm-4'>
                    {
                        terms.map(term => (
                            <li key={term.path}><Link to={term.path}>{term.name}</Link></li>
                        ))
                    }
                </ul>
                <ul className='p-0 col-12 col-sm-4'>
                    {
                        hows.map(how => (
                            <li key={how.path}><Link to={how.path}>{how.name}</Link></li>
                        ))
                    }
                </ul>
                <ul className='p-0 col-12 col-sm-4'>
                    {
                        socials.map(social => (
                            <li key={social.bg}><Link to={social.path}><span className='social-icon' style={{background: social.bg}}><i className={social.icon} /></span></Link></li>
                        ))
                    }
                </ul>
            </div>
        </footer>
    )
}

export default Footer
