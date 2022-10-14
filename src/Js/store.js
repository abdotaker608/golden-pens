import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {languageReducer, authReducer, preloadReducer} from './reducers';

const middlewares = [...getDefaultMiddleware()]

export const store = configureStore({
    reducer: {
        lang: languageReducer,
        auth: authReducer,
        preload: preloadReducer
    },
    middleware: middlewares
})
