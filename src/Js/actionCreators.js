import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoint} from '../API';


export const authenticateJwt = createAsyncThunk('authenticate/jwt', async (jwt) => {
    const results = await fetch(`${endpoint}/auth/auth_jwt`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({token: jwt})
    })
    const json = await results.json();
    return json;
})



//Sync Action Creators

export const switchLanguageTo = createAction("SWITCH_LANGUAGE");

export const loginUser = createAction("LOGIN_USER");

export const updateUser = createAction("UPDATE_USER");

export const logoutUser = createAction("LOGOUT_USER");

export const triggerLoaded = createAction("TRIGGER_LOADED");