import React from 'react'

function FetchPreloader({error, minHeight='500px'}) {
    return (
        <div className='fetch-preloader d-flex align-items-center justify-content-center' style={{minHeight: minHeight}} data-testid='prefetch'>
        {
            error ?
            <p className='text-center text-danger font-weight-bold'>{error}</p>
            :
            <div className='spinner spinner-border'></div>
        }
    </div>
    )
}

export default FetchPreloader
