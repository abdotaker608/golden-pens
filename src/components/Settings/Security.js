import React, {useState, useRef} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {validatePassword, validateConPw, validateRequired} from '../../Js/methods';
import {CSSTransition} from 'react-transition-group';
import Delete from './Delete';


function Security({endpoint, translate, user}) {

    const [status, setStatus] = useState({message: '', clsB: ''});
    const [errorMessages, setErrorMessages] = useState({})
    const [updateData, setUpdateData] = useState({});
    const [deleting, setDeleting] = useState(false);

    const [processing, setProcessing] = useState(false);

    const canSubmit = useRef(false);
    const passwordRef = useRef(null);
    const conPwRef = useRef(null);
    const currentPwRef = useRef(null);

    const handleChange = e => {
        if (user.with_provider) {
            if (e.target.name !== 'currentPassword'){
                e.target.value = '';
                return;   
            }
            const feedback = validateRequired(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
            setUpdateData({...updateData, [e.target.name]: feedback});
            return;
        }

        if (updateData.password && updateData.currentPassword && updateData.confirmPassword) canSubmit.current = true;
        setUpdateData({...updateData, [e.target.name]: e.target.value});

        if (e.target.name === 'currentPassword'){
            const feedback = validateRequired(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }

        if (e.target.name === 'password') {
            const feedback = validatePassword(e.target, conPwRef.current);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [feedback.name]: feedback.type});
            }
        }

        if (e.target.name === 'confirmPassword') {
            const feedback = validateConPw(e.target, passwordRef.current);
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
        fetch(`${endpoint}/auth/update_security/${user.pk}`, {
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

    const willDelete = () => {
        const feedback = validateRequired(currentPwRef.current);
        if (feedback) {
            setErrorMessages({...errorMessages, [currentPwRef.current.name]: feedback});
            return;
        }
        setDeleting(true);
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                status.message &&
                <div className={`my-3 py-2 text-${status.clsB}`}>{translate(status.message)}</div>
            }
            <div className='my-3'>
                <label htmlFor='currentPassword' className='form-label'>{translate('currentPassword')}</label>
                <input className='form-control' type='password' name='currentPassword' id='currentPassword' onChange={handleChange} ref={currentPwRef} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.currentPassword)}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='password' className='form-label'>{translate('password')}</label>
                <input className='form-control' type='password' name='password' id='password' onChange={handleChange} ref={passwordRef} disabled={user.with_provider} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.password)}</div>
            </div>
            <div className='my-3'>
                <label htmlFor='confirmPassword' className='form-label'>{translate('confirmPassword')}</label>
                <input className='form-control' type='password' name='confirmPassword' id='confirmPassword' onChange={handleChange} ref={conPwRef} disabled={user.with_provider} dir='auto'/>
                <div className='invalid-feedback mt-1 text-danger text-start'>{translate(errorMessages.confirmPassword)}</div>
            </div>
            <div className='my-3 py-3 text-center'>
                <ProcessingButton processing={processing}>{translate('save')}</ProcessingButton>
            </div>
            <div className='delete-acc'>
                <button type='button' onClick={willDelete}>{translate('delAcc')}</button>
            </div>
            <CSSTransition in={deleting} timeout={250} classNames='fade' unmountOnExit>
                <Delete translate={translate} setDeleting={setDeleting} user={user} password={updateData.currentPassword}/>
            </CSSTransition>
        </form>
    )
}

export default Security
