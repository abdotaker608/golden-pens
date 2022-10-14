import React, {useState, useEffect} from 'react';
import {translate} from '../../Js/methods';
import {useSelector, useDispatch} from 'react-redux';
import {endpoint} from '../../API';
import {loginUser} from '../../Js/actionCreators';
import {useHistory} from 'react-router-dom';

function Verify({match}) {

    const lang = useSelector(state => state.lang);
    const user = useSelector(state => state.auth);

    const history = useHistory();

    const translateWrapper = text => translate(text, lang);

    const dispatch = useDispatch();

    const [status, setStatus] = useState({message: 'processVerify', processing: true, icon: null, clsB: 'secondary'});

    useEffect(() => {
        fetch(`${endpoint}/auth/verify_email`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({token: match.params.token})
        })
            .then(res => res.json())
            .then(data => {
                if (data.pk) {
                    setStatus({message: 'doneVerify', icon: 'check', clsB: 'success', processing: false});
                    setTimeout(() => {
                        dispatch(loginUser(data));
                    }, 2000)
                }
                else setStatus({message: data.message, icon: 'times', clsB: 'danger', processing: false});
            })
            .catch(() => {
                setStatus({message: 'wentWrong', icon: 'times', clsB: 'danger', processing: false});
            })
    }, [])

    useEffect(() => {
        if (!status.processing && user) history.push('/dashboard');
    }, [user, status])

    return (
        <section style={{minHeight: '50vh'}}>
            <div style={{marginTop: '150px'}} className={`status-container d-flex align-items-center justify-content-center font-weight-bold text-${status.clsB}`}>
                {status.processing && <div className='spinner spinner-border mx-2'></div>}
                {status.icon && <span className='mx-2'><i className={`fas fa-${status.icon} fa-lg`} /></span>}
                {translateWrapper(status.message)}
            </div>
        </section>
    )
}

export default Verify
