import React, {useState, useRef} from 'react';
import {validateRequired} from '../../Js/methods';
import TextEditor from '../TextEditor/TextEditor';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';
import {useHistory} from 'react-router-dom';

function InfoForm({story, translate, lang, authToken, chapter={}, method, displayValue}) {

    const [chapterData, setChapterData] = useState(chapter.story ? {} : {story: story.id});
    const [errorMessages, setErrorMessages] = useState({});
    const [processing, setProcessing] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const history = useHistory();

    const canSubmit = useRef(method === 'PUT');

    const handleChange = e => {
        if (chapterData.title && chapterData.content) canSubmit.current = true;
        setChapterData({...chapterData, [e.target.name]: e.target.value});

        const feedback = validateRequired(e.target);
        if (feedback) {
            canSubmit.current = false;
            setErrorMessages({...errorMessages, [e.target.name]: feedback});
        }
    }

    const handleEditorChange = content => {
        if (chapterData.title && chapterData.content) canSubmit.current = true;
        if (!content) {
            canSubmit.current = false;
            setErrorMessages({...errorMessages, content: 'noContent'});
        }
        else setErrorMessages({...errorMessages, content: ''});
        setChapterData({...chapterData, content: content});
    }

    const publishChapter = form => {
        const endDir = method == 'POST' ? 'create/chapter' : `update/chapter/${chapter.id}`;
        fetch(`${endpoint}/stories/${endDir}`, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(chapterData)
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.id) history.push(`/story/c/${data.id}`);
            })
            .catch(() => {
                setProcessing(false);
                setSubmitError('wentWrong');
                form.scrollIntoView({behavior: 'smooth', block: 'start'});
            })
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (!canSubmit.current) return;
        setProcessing(true);
        publishChapter(e.target);
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {submitError && <div className='my-4 text-center text-danger font-weight-bold'>{translate(submitError)}</div>}
            <div className='my-3'>
                <input dir='auto' className='form-control' placeholder={translate('title')} type='text' id='title' name='title' onChange={handleChange} defaultValue={chapter.title}/>
                <div className='invalid-feedback my-1 text-danger'>{translate(errorMessages.title)}</div>
            </div>
            <div className='my-3'>
                <TextEditor onEditorChange={handleEditorChange} initialValue={translate('startWriting')} lang={lang} authToken={authToken} displayValue={displayValue}/>
                {errorMessages.content && <div className='my-1 text-danger'>{translate(errorMessages.content)}</div>}
            </div>
            <div className='mt-4 text-center'>
                <ProcessingButton processing={processing}>{translate('publish')}</ProcessingButton>
            </div>
        </form>
    )
}

export default InfoForm
