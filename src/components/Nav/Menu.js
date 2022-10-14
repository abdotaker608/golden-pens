import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Menu({links, authLinks}) {

    const lang = useSelector(state => state.lang);

    return (
        <div className='side-menu d-flex flex-column align-items-stretch'>
            {
                links.map(link => (
                    <Link to={link.path} key={link.path}><span className={lang === 'ar' ? 'ml-2' : 'mr-2'}><i className={link.icon} /></span> {link.name}</Link>
                ))
            }
            {
                authLinks.map(link => (
                    <Link to={link.path} key={link.path}><span className={lang === 'ar' ? 'ml-2' : 'mr-2'}><i className={link.icon} /></span> {link.name}</Link>
                ))
            }
        </div>
    )
}

export default Menu
