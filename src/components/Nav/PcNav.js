import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';


function PcNav({links, authLinks}) {

    const lang = useSelector(state => state.lang);
    
    return (
        <nav className='pc-nav px-5 py-3' data-testid='pc-nav-test'>
            <img src={require('../../static/icons/logo.svg').default} alt='Golden Pens Logo' />
            <div className='links-container d-flex align-items-center'>
                <div className='links mx-3'>
                    {
                        links.map(link => (
                            <Link to={link.path} key={link.path}>{link.name}</Link>
                        ))
                    }
                </div>
                <div className='auth-links mx-3'>
                    {
                        authLinks.map(link => (
                            <Link to={link.path} key={link.path}>
                                <button style={{background: link.bg, fontWeight: 'bold'}}>
                                    <span className={lang === 'ar' ? 'ml-2' : 'mr-2'}><i className={link.icon} /></span>{link.name}
                                </button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
}

export default PcNav
