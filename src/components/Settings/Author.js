import React, {useState, useRef} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {validateFBLink, validateInstaLink, validateTwitterLink} from '../../Js/methods';


function Author({endpoint, updateUser, translate, user}) {

    const [status, setStatus] = useState({message: '', clsB: ''});
    const [updateData, setUpdateData] = useState({
        author: {
            nickname: user.author.nickname,
            social: {
                fb: user.author.social.fb,
                insta: user.author.social.insta,
                twitter: user.author.social.twitter
            }
        }
    });

    const [processing, setProcessing] = useState(false);

    const canSubmit = useRef(true);

    const handleChange = e => {
        canSubmit.current = true;

        if (e.target.name === 'nickname') {
            setUpdateData({author: {...updateData.author, [e.target.name]: e.target.value}});
        }

        else {
            const validationFactory = {
                'fb': validateFBLink,
                'insta': validateInstaLink,
                'twitter': validateTwitterLink
            }
            setUpdateData({author: {...updateData.author, social: {...updateData.author.social, [e.target.name]: e.target.value}}});
            const feedback = validationFactory[e.target.name](e.target);
            if (feedback) canSubmit.current = false;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!canSubmit.current) return;

        setProcessing(true);
        fetch(`${endpoint}/auth/update_author/${user.pk}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.success) {
                    setStatus({message: data.message, clsB: 'success'});
                    updateUser(updateData);
                }
                else setStatus({message: data.message, clsB: 'danger'});
            })
            .catch(() => {
                setProcessing(false);
                setStatus({message: 'wentWrong', clsB: 'danger'});
            })
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                status.message &&
                <div className={`my-3 py-2 text-${status.clsB}`}>{translate(status.message)}</div>
            }
            <div className='my-3'>
                <label htmlFor='nickname' className='form-label'>{translate('nickname')}</label>
                <input className='form-control' type='text' name='nickname' id='nickname' defaultValue={user.author.nickname} onChange={handleChange} dir='auto'/>
            </div>
            <div className='my-3'>
                <label htmlFor='fb' className='form-label'>{translate('fbLink')}</label>
                <input className='form-control' type='text' name='fb' id='fb' defaultValue={user.author.social.fb} onChange={handleChange} dir='ltr'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate('enterValidLink')}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='insta' className='form-label'>{translate('instaLink')}</label>
                <input className='form-control' type='text' name='insta' id='insta' defaultValue={user.author.social.insta} onChange={handleChange} dir='ltr'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate('enterValidLink')}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='twitter' className='form-label'>{translate('twitterLink')}</label>
                <input className='form-control' type='text' name='twitter' id='twitter' defaultValue={user.author.social.twitter} onChange={handleChange} dir='ltr'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate('enterValidLink')}</div>
            </div>
            <div className='my-3 py-3 text-center'>
                <ProcessingButton processing={processing}>{translate('save')}</ProcessingButton>
            </div>
        </form>
    )
}

export default Author
