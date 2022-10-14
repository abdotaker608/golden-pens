import React from 'react';
import BecomeAuthor from './BecomeAuthor';
import WritePreview from './WritePreview';

function WritersHome({translate, setUpIntersectionObserver}) {

    return (
        <div className='animate__animated animate__fadeIn'>
            <BecomeAuthor translate={translate} setUpIntersectionObserver={setUpIntersectionObserver} />
            <WritePreview translate={translate} setUpIntersectionObserver={setUpIntersectionObserver} />
        </div>
    )
}

export default WritersHome
