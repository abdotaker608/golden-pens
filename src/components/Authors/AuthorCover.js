import React, {useState} from 'react';
import {endpoint} from '../../API';
import {Link} from 'react-router-dom';
import {normalizeNumber} from '../../Js/methods';

function AuthorCover({user, author, setFunc}) {

    const [processing, setProcessing] = useState(false);

    const getPicture = () => {
        return author.user.picture || author.user.social_picture || require('../../static/images/avatar.svg').default;
    }

    const inFollowers = author.inFollowers;

    const updateFollow = () => {
        if (processing) return;
        setProcessing(true);
        const newFollowers = inFollowers ? author.followers - 1 : author.followers + 1;
        setFunc(author.user.pk, newFollowers, !inFollowers);
        const data = {
            user: user.pk,
            author: author.user.pk,
        }
        fetch(`${endpoint}/stories/update_follow`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(() => setProcessing(false)).catch(() => setProcessing(false))
    }
    
    return (
        <div className='author'>
            <Link to={`/profile/${author.user.pk}`}><img src={getPicture()} alt={author.nickname || author.user.fullname} /></Link>
            <Link to={`/profile/${author.user.pk}`}>
                <h5 dir='auto' className='text-capitalize text-truncate'>{author.nickname || author.user.fullname}</h5>
            </Link>
            <button disabled={!user || user.pk === author.user.pk} onClick={updateFollow} key={inFollowers}>
                <span><i className={`fas fa-${inFollowers ? 'check' : 'plus'}`}/></span>
                <span>{normalizeNumber(author.followers)}</span>
            </button>
        </div>
    )
}

export default AuthorCover
