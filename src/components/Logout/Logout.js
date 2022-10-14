import React, {useEffect} from 'react';
import Preloader from '../Preloader/Preloader';
import {logoutUser} from '../../Js/actionCreators';
import {useDispatch} from 'react-redux';

function Logout() {

    const dispatch = useDispatch();

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        dispatch(logoutUser());

        return () => document.body.style.overflowY = 'scroll';
    }, [])

    return (
        <section style={{minHeight: '50vh'}}>
            <Preloader />
        </section>
    )
}

export default Logout
