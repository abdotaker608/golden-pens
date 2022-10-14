import React, {useState, useRef, useEffect} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {translate, validatePassword, validateConPw} from '../../Js/methods';
import {useSelector, useDispatch} from 'react-redux';
import {endpoint} from '../../API';
import {loginUser} from '../../Js/actionCreators';
import {useHistory} from 'react-router-dom';


function RecoverPassword({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const history = useHistory();

    const translateWrapper = text => translate(text, lang);

    const [resetData, setResetData] = useState({});
    const [status, setStatus] = useState({message: '', clsB: '', done: false});
    const [processing, setProcessing] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const passwordRef = useRef(null);
    const conPwRef = useRef(null);
    const canSubmit = useRef(false);


    const handleChange = e => {
        setResetData({...resetData, [e.target.name]: e.target.value});
        canSubmit.current = true;

        if (e.target.name === 'password') {
            const feedback = validatePassword(e.target, conPwRef.current);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [feedback.name]: feedback.type});
            }
        }

        if (e.target.name === 'confirm_password') {
            const feedback = validateConPw(e.target, passwordRef.current);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }
    }

    useEffect(() => {
        if (status.done && user) history.push('/dashboard');
    }, [user, processing])

    const handleSubmit = e => {
        e.preventDefault();

        const requiredNotFilled = !resetData.password || !resetData.confirm_password;

        if (!canSubmit.current || requiredNotFilled || processing) return;

        setProcessing(true);

        fetch(`${endpoint}/auth/complete_reset`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({password: resetData.password, token: match.params.token})
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.pk) {
                    setStatus({message: 'doneReset', clsB: 'success', done: true});
                    setTimeout(() => dispatch(loginUser(data)), 2000);
                }
                else{
                    setStatus({message: data.message, clsB: 'danger'});
                }
            })
            .catch(() => {
                setStatus({message: 'wentWrong', clsB: 'danger'});
                setProcessing(false);
            })
    }

    return (
        <section className='recover-request text-center' style={{minHeight: '50vh', marginTop: '100px'}}>
            <h2>{translateWrapper('resetPassword')}</h2>
            <form onSubmit={handleSubmit} noValidate>
                {
                    status.message && 
                    <div className='my-4'>
                        <p className={`text-${status.clsB} font-weight-bold`}>{translateWrapper(status.message)}</p>
                    </div>
                }
                <div className='my-3'>
                    <input className='form-control' type='password' name='password' id='password' placeholder={translateWrapper('password')} required onChange={handleChange} ref={passwordRef}/>
                    <div className='invalid-feedback my-1 text-danger'>{translateWrapper(errorMessages.password)}</div>
                </div>
                <div className='my-3'>
                    <input className='form-control' type='password' name='confirm_password' id='confirm_password' placeholder={translateWrapper('confirmPassword')} required onChange={handleChange} ref={conPwRef}/>
                    <div className='invalid-feedback my-1 text-danger'>{translateWrapper(errorMessages.confirm_password)}</div>
                </div>
                <div className='mt-4 mb-3 text-center'>
                    <ProcessingButton processing={processing}>{translateWrapper('submit')}</ProcessingButton>
                </div>
            </form>
        </section>
    )
}

export default RecoverPassword
