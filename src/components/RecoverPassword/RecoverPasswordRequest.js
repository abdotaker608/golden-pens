import React, {useState} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {translate} from '../../Js/methods';
import {useSelector} from 'react-redux';
import {endpoint} from '../../API';

function RecoverPasswordRequest() {

    const lang = useSelector(state => state.lang);

    const translateWrapper = text => translate(text, lang);

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({message: '', clsB: ''});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (processing) return;

        setProcessing(true);

        fetch(`${endpoint}/auth/request_reset`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({email: email})
        })
            .then(res => res.json())
            .then(data => {
                setStatus({message: data.message, clsB: data.success ? 'success' : 'danger'});
                setProcessing(false);
            })
            .catch(() => {
                setStatus({message: 'wentWrong', clsB: 'danger'});
                setProcessing(false);
            })
    }

    return (
        <section className='recover-request text-center' style={{minHeight: '50vh', marginTop: '100px'}}>
            <h2>{translateWrapper('recoverPassword')}</h2>
            <form onSubmit={handleSubmit}>
                {
                    status.message && 
                    <div className='my-4'>
                        <p className={`text-${status.clsB} font-weight-bold`}>{translateWrapper(status.message)}</p>
                    </div>
                }
                <div className='my-3'>
                    <input className='form-control' type='email' name='email' id='email' placeholder={translateWrapper('email')} required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='mt-4 mb-3 text-center'>
                    <ProcessingButton processing={processing}>{translateWrapper('submit')}</ProcessingButton>
                </div>
            </form>
        </section>
    )
}

export default RecoverPasswordRequest
