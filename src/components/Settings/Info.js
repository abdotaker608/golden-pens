import React, {useState, useRef} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {validateRequired, validateEmail} from '../../Js/methods';


function Info({endpoint, updateUser, translate, user}) {

    const [status, setStatus] = useState({message: '', clsB: ''});
    const [updateData, setUpdateData] = useState({first_name: user.first_name, last_name: user.last_name, email:user.email});
    const [processing, setProcessing] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const canSubmit = useRef(true);

    const handleChange = e => {
        canSubmit.current = true;

        if (e.target.name === 'first_name' || e.target.name === 'last_name') {
            setUpdateData({...updateData, [e.target.name]: e.target.value});
            const feedback = validateRequired(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }

        if (e.target.name === 'email') {
            if (user.with_provider) {
                e.target.value = user.email;
                return;
            }
            setUpdateData({...updateData, [e.target.name]: e.target.value});
            const feedback = validateEmail(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!canSubmit.current) return;

        setProcessing(true);

        fetch(`${endpoint}/auth/update_user/${user.pk}`, {
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
                    let updateDataToUse = {...updateData};
                    delete updateDataToUse.email;
                    updateUser(updateDataToUse);
                }
                else{
                    setStatus({message: data.message, clsB: 'danger'});
                }
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
                <label htmlFor='first_name' className='form-label'>{translate('firstname')}</label>
                <input className='form-control' type='text' name='first_name' id='first_name' defaultValue={user.first_name} onChange={handleChange} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.first_name)}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='last_name' className='form-label'>{translate('lastname')}</label>
                <input className='form-control' type='text' name='last_name' id='last_name' defaultValue={user.last_name} onChange={handleChange} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.last_name)}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='email' className='form-label'>{translate('email')}</label>
                <input className='form-control' type='email' name='email' id='email' defaultValue={user.email} onChange={handleChange} disabled={user.with_provider} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.email)}</div>
            </div>
            <div className='my-3 py-3 text-center'>
                <ProcessingButton processing={processing}>{translate('save')}</ProcessingButton>
            </div>
        </form>
    )
}

export default Info
