import React, {useEffect, useState} from 'react';
import {normalizeNumber} from '../../Js/methods';
import Media from './Media';
import {CSSTransition} from 'react-transition-group';

function UserProfile({user, profile, translate, updateFollow, lang}) {

    const [size, setSize] = useState(window.innerWidth >= 992 ? 'lg' : 'sm');
    const [media, setMedia] = useState(null);
    const [picture, setPicture] = useState(null);
    const [cover, setCover] = useState(null);

    const closeMedia = () => setMedia(null);

    const changeSize = () => {
        if (window.innerWidth >= 992) setSize('lg');
        else setSize('sm');
    }

    useEffect(() => {
        window.addEventListener('resize', changeSize);

        return () => {
            window.removeEventListener('resize', changeSize);
        }
    }, [])

    const infos = [
        {icon: 'fas fa-book-open fa-lg', value: normalizeNumber(profile.author.stories)},
        {icon: 'fas fa-user-check fa-lg', value: normalizeNumber(profile.author.followers)}
    ]

    const socialLinks = [
        {icon: 'fab fa-facebook-f fa-lg', url: profile.author.social.fb, cls: 'fb'},
        {icon: 'fab fa-instagram fa-lg', url: profile.author.social.insta, cls: 'insta'},
        {icon: 'fab fa-twitter fa-lg', url: profile.author.social.twitter, cls: 'twitter'}
    ]

    const following = profile.author.inFollowers;

    const getPicPosition = () => {
        if (size === 'sm') return {}
        if (lang === 'ar') return {right: '50px'};
        else return {left: '50px'};
    }

    return (
        <div className='profile-container'>
            <div className='cover'>
                <CSSTransition unmountOnExit timeout={250} classNames='fade' in={media !== null}>
                    <Media media={media} closeMedia={closeMedia} setPicture={setPicture} setCover={setCover} translate={translate} user={user}/>
                </CSSTransition>
                <img className='h-100 w-100' src={cover || profile.cover} />
                {
                    user && user.pk === profile.pk && 
                    <div className='cover-drop' onClick={() => setMedia('cover')}>
                        <span className='mx-2'><i className='fas fa-camera fa-lg' /></span>
                        {translate('edit')}
                    </div>
                }
                <img className='profile-pic' src={picture || profile.picture || profile.social_picture || require('../../static/images/avatar.svg').default} style={getPicPosition()}/>
                {
                    user && user.pk === profile.pk && 
                    <div className='pic-drop' style={getPicPosition()} onClick={() => setMedia('picture')}>
                        <span className='mx-2'><i className='fas fa-camera fa-lg' /></span>
                        {translate('edit')}
                    </div>
                }
            </div>
            <div className={`tools ${lang === 'ar' ? 'right-tools' : 'left-tools'}`}>
                <div className='names'>
                    <h3>{profile.fullname}</h3>
                    {profile.author.nickname && <h3>({profile.author.nickname})</h3>}
                </div>
                <div className='op-container'>
                    <div className='info-container'>
                        {
                            infos.map((info, idx) => (
                                <div className='info' key={idx}>
                                    <span><i className={info.icon} /></span>
                                    <span>{info.value}</span>
                                </div>
                            ))
                        }
                        {
                            user && user.pk !== profile.pk &&
                            <button onClick={() => updateFollow(following)} key={following}>
                                <span><i className={`fas fa-${following ? 'check' : 'plus'}`} /></span>
                                {translate('follow')}
                            </button>
                        }
                    </div>
                    <div className='social-container'>
                        {
                            socialLinks.filter(link => link.url !== null).map(link => (
                                <a href={link.url} target='_blank' className={link.cls} key={link.cls}>
                                    <span><i className={link.icon} /></span>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
