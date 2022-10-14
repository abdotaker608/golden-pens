import React from 'react';
import ADS from '../ADS/ADS';
import StoryOverview from './StoryOverview';

function Story({match}) {
    return (
        <div className='story-page'>
            <div className='story-container'>
                {/* <div className='w-100 d-flex align-items-center flex-column ads-cont'>
                    <ADS />
                    <ADS />
                </div> */}
                <StoryOverview storyId={match.params.id}/>
                {/* <div className='w-100 d-flex align-items-center flex-column ads-cont'>
                    <ADS />
                    <ADS />
                </div> */}
            </div>
        </div>
    )
}

export default Story
