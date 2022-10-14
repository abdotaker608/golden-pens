import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {normalizeNumber} from '../../Js/methods';
import {endpoint} from '../../API';


function AuthorInfo({story, user, setFunc}) {

    const [processingFollow, setProcessingFollow] = useState(false);

    const inFollowers = story.author.inFollowers;

    const getPicture = profile => {
        if (profile.social_picture) return profile.social_picture;
        if (profile.picture) return profile.picture;
        return require('../../static/images/avatar.svg').default;
    }

    const updateFollow = () => {
        if (processingFollow) return;

        setFunc(inFollowers ? story.author.followers - 1 : story.author.followers + 1, !inFollowers);

        setProcessingFollow(true);
        const data = {
            user: user.pk,
            author: story.author.user.pk
        }
        
        fetch(`${endpoint}/stories/update_follow`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => setProcessingFollow(false))
            .catch(() => setProcessingFollow(false));
    }


    return (
        <div className='author-container'>
        <div className='d-flex align-items-center'>
            <Link to={`/profile/${story.author.user.pk}`}>
                <img src={getPicture(story.author.user)} alt="Author's picture"/>
            </Link>
            <div>
                <Link to={`/profile/${story.author.user.pk}`}>
                    <h5 className='text-capitalize' dir='auto' title={story.author.nickname ? story.author.nickname : story.author.user.fullname} style={{maxWidth: '150px'}} className='text-truncate'>{story.author.nickname ? story.author.nickname : story.author.user.fullname}</h5>
                </Link>
                <div className='d-flex align-items-center mt-2'>
                    <h6>{normalizeNumber(story.author.followers)}</h6>
                    {
                        (user && story.author.user.pk !== user.pk) &&
                        (
                            inFollowers ?
                            <span key={1} className='follow-icon active' onClick={updateFollow}>
                                <i className='fas fa-user-minus' />
                            </span>
                            :
                            <span key={2} className='follow-icon' onClick={updateFollow}>
                                <i className='fas fa-user-plus' />
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default AuthorInfo
