import React from 'react';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import StoryCover from '../Exhibition/StoryCover';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function Stories({stories, rm=null}) {

    const lang = useSelector(state => state.lang);
    const translateWrapper = text => translate(text, lang);


    return (
        <React.Fragment>
            {
                (stories && stories.length > 0) ?
                <TransitionGroup className='stories-container mt-5'>
                    {
                        stories.map(story => (
                            <CSSTransition classNames='slide' key={story.id} unmountOnExit timeout={250}>
                                <div className='story-container'>
                                    <StoryCover story={story}/>
                                    {rm && <button className='remove mt-3' onClick={() => rm(story.id)}>{translateWrapper('remove')}</button>}
                                </div>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
                :
                <FetchPreloader error={stories && stories.length === 0 ? translateWrapper('noEntry') : ''} minHeight='250px'/>
            }
        </React.Fragment>
    )
}

export default Stories
