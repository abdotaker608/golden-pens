import React from 'react';
import moment from 'moment';
import ar from 'moment/locale/ar';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {translate as trans} from '../../Js/methods';

function StoryCover({story}) {

    const lang = useSelector(state => state.lang);
    const translate = text => trans(text, lang);

    return (
        <Link className='story' key={story.id} to={`/story/${story.id}`}>
            <img src={story.cover} alt={story.title} />
            <h4 className='text-capitalize'>{story.title}</h4>
            <h6 className='text-capitalize'>{moment(story.created).locale(lang).fromNow()}</h6>
            <h6 className='text-capitalize'>{`${translate('by')} ${story.author.nickname || story.author.user.fullname}`}</h6>
        </Link>
    )
}

export default StoryCover
