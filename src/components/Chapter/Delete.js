import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import NotAllowed from '../NotAllowed/NotAllowed';
import {useHistory} from 'react-router-dom';

function Delete({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);
    const history = useHistory();

    const translateWrapper = text => translate(text, lang);

    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState({message: '', clsB: ''});
    const [chapter, setChapter] = useState(null);

    const fetchChapter = () => {
        fetch(`${endpoint}/stories/chapters/${match.params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.id) setChapter(data);
                else setStatus({message: 'failFetch', clsB: 'danger'});
            })
            .catch(() => setStatus({message: 'wentWrong', clsB: 'danger'}));
    }

    useEffect(() => {
        fetchChapter();
    }, [])

    const deleteChapter = () => {
        setProcessing(true);
        fetch(`${endpoint}/stories/update/chapter/${match.params.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            },
            method: 'DELETE'
        })
            .then(res => {
                setProcessing(false);
                if (res.status === 204) {
                    setStatus({message: 'deleted', clsB: 'success'});
                    setTimeout(() => history.push(`/story/${chapter.story.id}`), 1000);
                }
                else setStatus({message: 'wentWrong', clsB: 'danger'});
            })
            .catch(() => setStatus({message: 'wentWrong', clsB: 'danger'}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        deleteChapter();
    }

    if (!user) return <NotAllowed />
    if (chapter && (user.pk !== chapter.story.author.user.pk)) return <Redirect to='/dashboard' />

    return (
        <div className='delete-story'>
            {
                chapter ?
                <React.Fragment>
                <div className='story-container'>
                    <img src={chapter.story.cover} alt={chapter.story.title} />
                    <h2>{chapter.title}</h2>
                </div>
                {status.message && <div className={`text-${status.clsB} text-center my-4`}>{translateWrapper(status.message)}</div>}
                <h3>{translateWrapper('aboutDeleteC')}</h3>
                <form onSubmit={handleSubmit}>
                    <ProcessingButton processing={processing}>{translateWrapper('confirm')}</ProcessingButton>
                </form>
                </React.Fragment>
                :
                <FetchPreloader error={translateWrapper(status.message)} />
            }
        </div>
    )
}

export default Delete
