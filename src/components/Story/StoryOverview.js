import React, {useEffect, useState, useRef, useCallback} from 'react';
import {endpoint, categoryMap} from '../../API';
import {useSelector} from 'react-redux';
import {translate, normalizeNumber} from '../../Js/methods';
import Tag from '../Write/Tag';
import AuthorInfo from './AuthorInfo';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import TableOfContents from './TableOfContents';
import moment from 'moment';
import 'moment/locale/ar';
import ShareContainer from '../ShareContainer/ShareContainer';

function StoryOverview({storyId}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);
    const [tagsHidden, setTagsHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    
    const tagsContainer = useRef(null);

    const translateWrapper = text => translate(text, lang);

    const [story, setStory] = useState(null);
    const [error, setError] = useState(null);

    const fetchStory = () => {
        let url = `${endpoint}/stories/overview/${storyId}`;
        let fetchUrl = url;
        if (user) fetchUrl += `?user=${user.pk}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    if (!data.tags[0]) data.tags = [];
                    setStory(data);
                    fetch(url);
                }
                else setError('failFetch');
            })
            .catch(() => {
                setError('wentWrong');
            })
    }

    const setTagsStyles = useCallback(() => {
        if (clicked) return;
        const el = tagsContainer.current;
        el.style.maxHeight = 'unset';
        if (el.clientHeight > 130) setTagsHidden(true);
        else setTagsHidden(false);
        el.style.maxHeight = '130px';
    }, [clicked])

    useEffect(() => {
        window.addEventListener('resize', setTagsStyles);

        return () => {
            window.removeEventListener('resize', setTagsStyles);
        }
    }, [setTagsStyles])

    useEffect(() => {
        fetchStory();
    }, [user])

    useEffect(() => {
        if (story) setTagsStyles();
    }, [story])

    const showAllTags = () => {
        tagsContainer.current.style.maxHeight = 'unset';
        setClicked(true);
        setTagsHidden(false);
    }

    const setFunc = (newFollowers, state) => {
        setStory({
            ...story,
            author: {
                ...story.author,
                followers: newFollowers,
                inFollowers: state
            }
        })
    }

    const storyStats = story ? [
        {icon: 'fas fa-eye', value: story.get_stats.views, key: 1},
        {icon: 'fas fa-heart', value: story.get_stats.loves, key: 2},
        {icon: 'fas fa-comment-alt', value: story.get_stats.replies, key: 3}
    ] : []

    return (
        <React.Fragment>
            {
                story ?
                <div className='story-overview'>
                    <div className='info-container'>
                        <div className='author-opts'>
                            <AuthorInfo user={user} story={story} setFunc={setFunc}/>
                            {
                                user && story.author.user.pk === user.pk && 
                                <ShareContainer url={window.location.href.toString()} hashtags={['GP', 'GoldenPens']} 
                                title={`Hey, Check my new story..${story.title}!`}/>
                            }
                        </div>
                        <div className='cover-container'>
                            <div className='text-center'>
                                <img src={story.cover} alt={`${story.title}'s Cover`} />
                                <h6 className='text-capitalize'>{`${translateWrapper('pub')} ${moment(story.created).locale(lang).fromNow()}`}</h6>
                                <div className='stats-container d-flex justify-content-center align-items-center'>
                                    {
                                        storyStats.map(stat => (
                                            <div className='mx-3' key={stat.key}>
                                                <span className='d-block'><i className={stat.icon} /></span>
                                                <span>{normalizeNumber(stat.value)}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='gx'>
                                <h2 className='text-capitalize'>{story.title}</h2>
                                <h5>{categoryMap[story.category]}</h5>
                                <div className='tags-container' ref={tagsContainer}>
                                    {
                                        story.tags.map(tag => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))
                                    }
                                    {tagsHidden && <div className='backdrop-layer'></div>}
                                </div>
                                {tagsHidden && <div className='mt-1 mx-2 s-m-e' onClick={showAllTags}>{translateWrapper('seeMore')}</div>}
                            </div>
                        </div>
                    </div>
                    <div className='desc mt-5 text-secondary' dir='auto'>
                        <p>{story.description ? story.description : translateWrapper('noDesc')}</p>
                    </div>
                    <TableOfContents story={story} translate={translateWrapper} user={user}/>
                </div>
                :
                <FetchPreloader error={translateWrapper(error)} />
            }
        </React.Fragment>
    )
}

export default StoryOverview
