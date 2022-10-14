import React, {useEffect, useState} from 'react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import UserProfile from './UserProfile';
import TopStories from './TopStories';


function Profile({match}) {

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const user = useSelector(state => state.auth);
    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const fetchProfile = () => {
        let url = `${endpoint}/auth/profile/${match.params.id}`;
        let fetchUrl = url;
        if (user) fetchUrl += `?user=${user.pk}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.pk) setProfile(data);
                else setError('failFetch');
                fetch(url);
            })
            .catch(() => setError('wentWrong'))
    }

    const updateFollow = following => {
        if (processing) return;
        setProcessing(true);

        var newFollowers;
        if (following) newFollowers = profile.author.followers - 1;
        else newFollowers = profile.author.followers + 1;
        setProfile({...profile, author: {...profile.author, followers: newFollowers, inFollowers: !following}});
        
        const data = {
            user: user.pk,
            author: profile.pk
        }
        
        fetch(`${endpoint}/stories/update_follow`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(() => setProcessing(false)).catch(() => setProcessing(false));
    }

    useEffect(() => {
        fetchProfile();
    }, [user])


    return (
        <div className='profile'>
            {
                profile ? 
                <React.Fragment>
                    <UserProfile user={user} profile={profile} translate={translateWrapper} updateFollow={updateFollow} lang={lang}/>
                    <TopStories profile={profile} translate={translateWrapper}/>
                </React.Fragment>
                :
                <FetchPreloader error={translateWrapper(error)}/>
            }
        </div>
    )
}

export default Profile
