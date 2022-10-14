import React , {useState, useEffect, useRef} from 'react';
import SocialButton from '../SocialButton/SocialButton';
import {endpoint} from '../../API'
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../Js/actionCreators';
import {Link} from 'react-router-dom';

function LoginForm({translate}) {

    const [loginData, setLoginData] = useState({});
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [withProvider, setWithProvider] = useState(false);

    const dispatch = useDispatch();

    const handleSocialSuccess = (user) => {
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
                setLoginData({
                    social_id: profile.id,
                    social_picture: response.data.url,
                    first_name: profile.firstName,
                    last_name: profile.lastName,
                    email: profile.email,
                });
                setWithProvider(true);
            }
        )
    }

    const handleSocialFailure = (e) => {
        setErrorMessage('wentWrong');
        setProcessing(false)
        setWithProvider(false);
    }

    const handleChange = e => setLoginData({...loginData, [e.target.name]: e.target.value});

    const authorizeUser = form => {
        fetch(`${endpoint}/auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({...loginData, withProvider})
        })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                if (data.pk) dispatch(loginUser(data));
                else if (data.detail) setErrorMessage('throttled');
                else setErrorMessage(data.message);
                if (form) form.scrollIntoView({behavior: 'smooth', block: 'start'});
            })
            .catch(() => {
                setErrorMessage('wentWrong');
                setProcessing(false);
                if (form) form.scrollIntoView({behavior: 'smooth', block: 'start'});
            })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setProcessing(true);
        authorizeUser(e.target);
    }

    useEffect(() => {
        if (loginData.social_id && withProvider) authorizeUser();
    }, [loginData, withProvider])


    return (
        <form className='animate__animated animate__fadeInUp animate__fast' onSubmit={handleSubmit}>
            {
                errorMessage &&
                <div className='mb-5 mt-3 text-center'>
                    <p className='text-danger font-weight-bold'>{translate(errorMessage)}</p>
                </div>
            }
            <div className='my-3'>
                <SocialButton
                    appId='927216781143248'
                    provider='facebook'
                    onLoginSuccess={handleSocialSuccess}
                    onLoginFailure={handleSocialFailure}
                    onLogoutSuccess={() => null}
                >
                    <span className='mx-2'><i className='fab fa-facebook-f' /></span> {translate('fbLogin')}
                </SocialButton>
            </div>
            <div className='col-12 breaker p-3'>
                <span></span>
                <span>{translate('or')}</span>
            </div>
            <div className='my-3'>
                <label className='form-label' htmlFor='email'>{translate('email')}</label>
                <input dir='auto' className='form-control' type='email' name='email' id='email' required onChange={handleChange}/>
            </div>
            <div className='my-3'>
                <label className='form-label' htmlFor='password'>{translate('password')}</label>
                <input dir='auto' className='form-control' type='password' name='password' id='password' required onChange={handleChange}/>
            </div>
            <div className='mt-4 mb-3 p-1 text-center'>
                <ProcessingButton processing={processing}>{translate('login')}</ProcessingButton>
            </div>
            <div className='mt-5 mb-4'>
                <Link to='/request-reset'>{translate('forgotPasswordAsk')}</Link>
            </div>
        </form>
    )
}

export default LoginForm
