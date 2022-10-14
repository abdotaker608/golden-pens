import React, {useState} from 'react';
import ProcessingButton from '../ProcessingButton/ProcessingButton';
import {endpoint} from '../../API';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../Js/actionCreators';

function Delete({translate, setDeleting, user, password}) {

    const dispatch = useDispatch();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const deleteUser = e => {
        e.preventDefault();
        if (processing) return;
        setProcessing(true);

        fetch(`${endpoint}/auth/delete/${user.pk}`, {
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({password})
        })
            .then(res => {
                setProcessing(false);
                if (res.status === 204) dispatch(logoutUser());
                else if (res.status === 401) setError('incorrectPassword');
            })
            .catch(() => {
                setProcessing(false);
                setError('wentWrong');
            })
    }

    return (
        <div className='confirm-delete'>
            <div className='confirm-dialog'>
                {error && <div className='font-weight-bold text-center text-danger my-3'>{translate(error)}</div>}
                <p>{translate('confirmDel')}</p>
                <div className='d-flex justify-content-center align-items-center mt-4'>
                    <ProcessingButton processing={processing} onClick={deleteUser}>{translate('confirm')}</ProcessingButton>
                    <button type='button' onClick={() => setDeleting(false)}>{translate('cancel')}</button>
                </div>
            </div>
        </div>
    )
}

export default Delete
