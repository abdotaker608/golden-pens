import React, {useState, useEffect} from 'react';
import {endpoint} from '../../API';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import AuthorInfo from '../Story/AuthorInfo';
import moment from 'moment';
import ar from 'moment/locale/ar';
import {Link} from 'react-router-dom';
import {isArabic} from '../../Js/methods';
import Dropdown from '../Dropdown/Dropdown';
import Loves from './Loves';
import Reply from './Reply';

function Read({id, translate, user, lang}) {

    const [error, setError] = useState('');
    const [chapter, setChapter] = useState(null);

    const fetchChapter = () => {
        let url = `${endpoint}/stories/chapters/${id}`;
        let fetchUrl = url;
        if (user) fetchUrl += `?user=${user.pk}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setChapter(data);
                    fetch(url);
                    return;
                }
                setError('failFetch');
            })
            .catch(() => {
                setError('wentWrong');
            })
    }

    const checkView = () => {
        fetch(`${endpoint}/stories/view/chapter/${chapter.id}`);
    }

    useEffect(() => {
        fetchChapter();
    }, [user])

    useEffect(() => {
        if (chapter) checkView();
    }, [chapter])

    const setFunc = (newFollowers, state) => {
        setChapter({
            ...chapter,
            story: {
                ...chapter.story,
                author: {
                    ...chapter.story.author,
                    followers: newFollowers,
                    inFollowers: state
                }
            }
        })
    }

    const links = chapter ? [
        {name: translate('edit'), path: `/edit/c/${chapter.id}`, icon: 'fas fa-edit'},
        {name: translate('delete'), path: `/delete/c/${chapter.id}`, icon: 'fas fa-trash'}
    ] : []

    const linksElems = links.map(link => (
        <Link className='d-link' to={link.path} key={link.path}><span className='mx-2'><i className={link.icon} /> {link.name}</span></Link>
    ))

    return (
        <React.Fragment>
            {
                chapter ?
                <div className='chapter-container'>
                    <div className='info-container'>
                        <div>
                            <h2 className='text-capitalize' dir='auto'><Link to={`/story/${chapter.story.id}`}>{chapter.title}</Link></h2>
                            <h6 className='text-capitalize'>{`${translate('pub')} ${moment(chapter.created).locale(lang).fromNow()}`}</h6>
                        </div>
                        {
                                user && user.pk === chapter.story.author.user.pk ?
                                <Dropdown items={linksElems} />
                                :
                                <AuthorInfo story={chapter.story} user={user} setFunc={setFunc} />
                        }
                    </div>
                    <div dir='auto' className='content' dangerouslySetInnerHTML={{__html: chapter.content}} style={isArabic(chapter.content) ? {fontFamily: 'Tajawal, sans-serif'} : {}}></div>
                    <div className='btns d-flex justify-content-between align-items-center' key={lang}>
                        {chapter.prev && <Link to={`/story/c/${chapter.prev}`}><span className='mx-2'><i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'}`} /></span>{translate('prev')}</Link>}
                        {chapter.next && <Link to={`/story/c/${chapter.next}`}>{translate('next')}<span className='mx-2'><i className={`fas fa-arrow-${lang === 'ar' ? 'left' : 'right'}`} /></span></Link>}
                    </div>
                    <Loves user={user} chapter={chapter} />
                    <Reply user={user} chapter={chapter} translate={translate}/>
                </div>
                :
                <FetchPreloader error={translate(error)} />
            }
        </React.Fragment>
    )
}

export default Read
