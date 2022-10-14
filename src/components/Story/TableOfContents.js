import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import {endpoint} from '../../API';


function TableOfContents({story, translate, user}) {

    const [chapters, setChapters] = useState(null);
    const [error, setError] = useState('');
    
    const fetchChapters = () => {
        fetch(`${endpoint}/stories/overview/chapters/${story.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    setChapters(data);
                }
                else{
                    setChapters([]);
                    setError('failFetch');
                }
            })
            .catch(() => setError('wentWrong'));
    }

    useEffect(() => {
        fetchChapters();
    }, [])

    const links = [
        {name: translate('newChapter'), icon: 'fas fa-plus fa-lg', path: `/write/nc/${story.id}`},
        {name: translate('editStory'), icon: 'fas fa-edit fa-lg', path: `/edit/story/${story.id}`},
        {name: translate('deleteStory'), icon: 'fas fa-trash fa-lg', path: `/delete/story/${story.id}`},
        {name: translate('save'), icon: 'fas fa-download fa-lg', path: `/save/${story.id}`}
    ]

    const eLinks = [
        {name: translate('report'), icon: 'fas fa-flag fa-lg', path: `/report/${story.id}`},
        {name: translate('save'), icon: 'fas fa-download fa-lg', path: `/save/${story.id}`}
    ]

    const linksElems = links.map(link => (
        <Link className='item' to={link.path} key={link.path}><span><i className={link.icon} /></span> <span className='mx-2'>{link.name}</span></Link>
    ))

    const reportElems = eLinks.map(link => (
        <Link className='item' to={link.path} key={link.path}><span><i className={link.icon} /></span> <span className='mx-2'>{link.name}</span></Link>
    ))

    const loggedOutElems = eLinks.slice(1).map(link => (
        <Link className='item' to={link.path} key={link.path}><span><i className={link.icon} /></span> <span className='mx-2'>{link.name}</span></Link>
    ))

    return (
        <div className='contents-table'>
            <div className='table-header'>
                <h4>{translate('tableOfContents')}</h4>
                {
                    user ?
                    <React.Fragment>
                        {
                            user.pk === story.author.user.pk ?
                            <Dropdown items={linksElems} />:
                            <Dropdown items={reportElems} />
                        }
                    </React.Fragment>
                    :
                    <Dropdown items={loggedOutElems} />
                }
            </div>
            {
                    chapters ?
                    <div className='chapters-container d-flex flex-column'>
                        {
                            chapters.length === 0 ?
                            <div className='py-5 text-center text-secondary'>
                                <p>{translate('noDesc')}</p>
                            </div>
                            :
                            chapters.map(chapter => (
                                    <Link to={`/story/c/${chapter.pk}`} className='text-capitalize' key={chapter.pk}>
                                        <div className='chapter' key={chapter.pk} dir='auto'>{chapter.title}</div>
                                    </Link>
                            ))
                        }
                    </div>
                    :
                    <FetchPreloader error={translate(error)}/>
            }
        </div>
    )
}

export default TableOfContents
