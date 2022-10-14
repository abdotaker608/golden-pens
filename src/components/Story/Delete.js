import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';
import FetchPreloader from '../FetchPreloader/FetchPreloader';
import NotAllowed from '../NotAllowed/NotAllowed';

function Delete({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState({message: '', clsB: ''});
    const [story, setStory] = useState(null);

    const fetchStory = () => {
        fetch(`${endpoint}/stories/overview/${match.params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.id) setStory(data);
                else setStatus({message: 'failFetch', clsB: 'danger'});
            })
            .catch(() => setStatus({message: 'wentWrong', clsB: 'danger'}));
    }

    useEffect(() => {
        fetchStory();
    }, [])

    const deleteStory = () => {
        setProcessing(true);
        fetch(`${endpoint}/stories/update/${match.params.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
            },
            method: 'DELETE'
        })
            .then(res => {
                setProcessing(false);
                if (res.status === 204) setStatus({message: 'deleted', clsB: 'success'});
                else setStatus({message: 'wentWrong', clsB: 'danger'});
            })
            .catch(() => setStatus({message: 'wentWrong', clsB: 'danger'}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        deleteStory();
    }

    if (!user) return <NotAllowed />
    if (story && (user.pk !== story.author.user.pk)) return <Redirect to='/dashboard' />

    return (
        <div className='delete-story'>
            {
                story ?
                <React.Fragment>
                <div className='story-container'>
                    <img src={story.cover} alt={story.title} />
                    <h2>{story.title}</h2>
                </div>
                {status.message && <div className={`text-${status.clsB} text-center my-4`}>{translateWrapper(status.message)}</div>}
                <h3>{translateWrapper('aboutDelete')}</h3>
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
