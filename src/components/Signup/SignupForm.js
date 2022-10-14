import React, {useState, useRef, useEffect} from 'react';
import {endpoint} from '../../API';
import {validateRequired, validateEmail, validatePassword, validateConPw} from '../../Js/methods';
import SocialButton from '../SocialButton/SocialButton';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../Js/actionCreators';
import ProcessingButton from '../ProcessingButton/ProcessingButton';

function SignupForm({translate}) {

    const [registerData, setRegisterData] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const conPwRef = useRef(null);
    const pwRef = useRef(null);
    const [submitStatus, setSubmitStatus] = useState({message: '', clsB: ''});
    const [processing, setProcessing] = useState(false);
    const [withProvider, setWithProvider] = useState(false);

    const canSubmit = useRef(false);

    const dispatch = useDispatch();

    const handleChange = e => {
        canSubmit.current = true;

        if (e.target.name === 'first_name' || e.target.name === 'last_name') {
            const feedback = validateRequired(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }

        else if (e.target.name === 'email') {
            const feedback = validateEmail(e.target);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }

        else if (e.target.name === 'password') {
            const feedback = validatePassword(e.target, conPwRef.current);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [feedback.name]: feedback.type});
            }
        }

        else if (e.target.name === 'confirm_password') {
            const feedback = validateConPw(e.target, pwRef.current);
            if (feedback) {
                canSubmit.current = false;
                setErrorMessages({...errorMessages, [e.target.name]: feedback});
            }
        }

        if (e.target.name !== 'confirm_password') setRegisterData({...registerData, [e.target.name]: e.target.value});
    }

    const sendRegisterData = form => {
        fetch(`${endpoint}/auth/register`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({...registerData, withProvider: withProvider})
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.pk) dispatch(loginUser(data));
                else if (data.success) setSubmitStatus({message: data.message, clsB: 'success'});
                else setSubmitStatus({message: data.message, clsB: 'danger'});
                setWithProvider(false);
                form.scrollIntoView({block: 'start', behavior: 'smooth'});
            })
            .catch(() => {
                setSubmitStatus({message: 'wentWrong', clsB: 'danger'});
                setProcessing(false);
                setWithProvider(false);
                form.scrollIntoView({block: 'start', behavior: 'smooth'});
            })
    }

    useEffect(() => {
        if (registerData.social_id && withProvider) sendRegisterData(document.querySelector('#signupForm'));
    }, [registerData, withProvider])

    const handleSocialSuccess = user => {
        setProcessing(true);
        const profile = user._profile;
        window.FB.api(
            `${profile.id}/picture`,
            {
                'type': 'large',
                'redirect': false,
                'width': 200,
                'height': 200
            },
            response => {
                setRegisterData({first_name: profile.firstName, last_name: profile.lastName, email: profile.email, social_picture: response.data.url, social_id: profile.id});
                setWithProvider(true);
            }
        )
    }

    const handleSocialFailure = (e) => {
        setSubmitStatus({message: 'wentWrong', clsB: 'danger'});
        setWithProvider(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const requiredNotFilled = !registerData.first_name || !registerData.last_name || !registerData.email || !registerData.password;
        if (!canSubmit.current || processing || requiredNotFilled) return;
        setProcessing(true);
        sendRegisterData(e.target);
    }

    return (
        <form className='row gy-4' onSubmit={handleSubmit} noValidate id='signupForm'>
            {
                submitStatus.message &&
                <div className='col-12 text-center font-weight-bold'>
                    <p className={`text-${submitStatus.clsB}`}>{translate(submitStatus.message)}</p>
                </div>
            }
            <div className='col-12 text-center'>
                <SocialButton
                    appId='927216781143248'
                    provider='facebook'
                    onLoginSuccess={handleSocialSuccess}
                    onLoginFailure={handleSocialFailure}
                    onLogoutSuccess={() => null}
                >
                    <span className='mx-2'><i className='fab fa-facebook-f' /></span> {translate('fbSignup')}
                </SocialButton>
            </div>
            <div className='col-12 breaker p-3'>
                <span></span>
                <span>{translate('or')}</span>
            </div>
            <div className='col-12 col-lg-6'>
                <label className='form-label' htmlFor='first_name'>{translate('firstname')}</label>
                <input dir='auto' id='first_name' name='first_name' className='form-control' placeholder='John' type='text' onChange={handleChange}/>
                <div className='invalid-feedback mt-1 text-danger'>{translate(errorMessages.first_name)}</div>
            </div>
            <div className='col-12 col-lg-6'>
                <label className='form-label' htmlFor='last_name'>{translate('lastname')}</label>
                <input dir='auto' id='last_name' name='last_name' className='form-control' placeholder='Smith' type='text' onChange={handleChange}/>
                <div className='invalid-feedback mt-1 text-danger'>{translate(errorMessages.last_name)}</div>
            </div>
            <div className='col-12'>
                <label className='form-label' htmlFor='email'>{translate('email')}</label>
                <div className='input-group'>
                    <span className='input-group-text'>@</span>
                    <input dir='auto' id='email' name='email' className='form-control' placeholder='John@example.com' type='email' onChange={handleChange}/>
                    <div className='invalid-feedback mt-1 text-danger'>{translate(errorMessages.email)}</div>
                </div>
            </div>
            <div className='col-12 col-lg-6'>
                <label className='form-label' htmlFor='password'>{translate('password')}</label>
                <input dir='auto' id='password' name='password' className='form-control' placeholder='********' type='password' onChange={handleChange} ref={pwRef} data-testid='pass-input' minLength={8} maxLength={20}/>
                <div className='invalid-feedback mt-1 text-danger'>{translate(errorMessages.password)}</div>
            </div>
            <div className='col-12 col-lg-6'>
                <label className='form-label' htmlFor='confirm_password'>{translate('confirmPassword')}</label>
                <input dir='auto' id='confirm_password' name='confirm_password' className='form-control' placeholder='********' type='password' onChange={handleChange} ref={conPwRef} data-testid='conpw-input' minLength={8} maxLength={20}/>
                <div className='invalid-feedback mt-1 text-danger'>{translate(errorMessages.conPw)}</div>
            </div>
            <div className='col-12 text-center pt-4 pb-3'>
                <ProcessingButton processing={processing}>{translate('submit')}</ProcessingButton>
            </div>
        </form>
    )
}

export default SignupForm
