import {createReducer} from '@reduxjs/toolkit';
import {switchLanguageTo, loginUser, logoutUser, triggerLoaded, authenticateJwt, updateUser} from './actionCreators';


export const languageReducer = createReducer(window.localStorage.getItem('__prefl') || 'en', {
    [switchLanguageTo]: (state, action) => {
        window.localStorage.setItem('__prefl', action.payload);
        state = action.payload;
        return state;
    }
})

export const authReducer = createReducer(null, {
    [loginUser]: (state, action) => {
        window.localStorage.setItem('__eupk', action.payload.get_jwt);
        state = action.payload;
        return state;
    },
    [logoutUser]: state => {
        window.localStorage.removeItem('__eupk');
        state = null;
        window.location = '/';
        return state;
    },
    [updateUser]: (state, action) => {
        if (action.payload.author){
            state = {...state, author: {...state.author, ...action.payload.author}};
            return state;
        }
        state = {...state, ...action.payload};
        return state;
    },
    [authenticateJwt.fulfilled]: (state, action) => {
        if (action.payload.pk) {
            state = action.payload;
            return state;
        }
    }
})

export const preloadReducer = createReducer(true, {
    [triggerLoaded]: state => {
        state = false;
        document.body.style.overflowY = 'scroll';
        return state;
    },
    [authenticateJwt.fulfilled]: state => {
        state = false;
        document.body.style.overflowY = 'scroll';
        return state;
    },
    [authenticateJwt.rejected]: state => {
        state = false;
        document.body.style.overflowY = 'scroll';
        return state;
    }
})