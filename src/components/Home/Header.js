import React from 'react';


function Header({setShowKey, translate}) {

    return (
        <header>
            <div className='content'>
                <h1>{translate('golden_pens')}</h1>
                <h5>{translate('enjoy')}</h5>
                <div className='btn-container mt-5'>
                    <button onClick={() => setShowKey('reader')}>{translate('reader_ask')}</button>
                    <button onClick={() => setShowKey('writer')}>{translate('writer_ask')}</button>
                </div>
            </div>
            <img src={require('../../static/images/covers.png').default} alt='Sotries Covers'/>
        </header>
    )
}

export default Header
