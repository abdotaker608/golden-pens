import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {translate} from '../../Js/methods';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';
import {Redirect} from 'react-router-dom';

function Report({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const translateWrapper = text => translate(text, lang);

    const [reportData, setReportData] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState({message: '', clsB: ''});

    const submitReport = () => {
        setProcessing(true);

        const data = {
            story: match.params.id,
            original: reportData.original,
            comment: reportData.comment,
            user: user.pk
        }

        fetch(`${endpoint}/stories/report`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.id) {
                    setStatus({message: "reportReceive", clsB: 'success'});
                }
            })
            .catch(() => setStatus({message: 'wentWrong', clsB: 'danger'}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!reportData.original) return;
        submitReport();
    }

    const handleChange = e => setReportData({...reportData, [e.target.name]: e.target.value});

    if (!user) return <Redirect to='/login' />

    return (
        <div className='report-story'>
            <h2>{translateWrapper('report')}</h2>
            <form onSubmit={handleSubmit}>
                {status.message && <div className={`my-4 text-center text-${status.clsB}`}>{translateWrapper(status.message)}</div>}
                <div className='my-3'>
                    <input dir='auto' className='form-control' name='original' id='original' required type='text' onChange={handleChange} placeholder={translateWrapper('originalSource')}/>
                </div>
                <div className='my-3'>
                    <textarea dir='auto' className='form-control' name='comment' id='comment' onChange={handleChange} placeholder={translateWrapper('additionalNotes')} />
                </div>
                <ProcessingButton processing={processing}>{translateWrapper('submit')}</ProcessingButton>
            </form>
        </div>
    )
}

export default Report
