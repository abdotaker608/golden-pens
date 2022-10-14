import React from 'react';
import ReaderCommunity from './ReaderCommunity';
import ManyFields from './ManyFields';
import OurApp from './OurApp';

function ReadersHome({translate, setUpIntersectionObserver}) {
    return (
        <div className='animate__animated animate__fadeIn'>
            <ReaderCommunity translate={translate} setUpIntersectionObserver={setUpIntersectionObserver} />
            <ManyFields translate={translate} setUpIntersectionObserver={setUpIntersectionObserver} />
            <OurApp translate={translate} setUpIntersectionObserver={setUpIntersectionObserver} />
        </div>
    )
}

export default ReadersHome
