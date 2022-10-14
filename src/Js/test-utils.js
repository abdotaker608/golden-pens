import {render as rtlrender} from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store as mockStore} from './store';


const render = (ui, {store=mockStore, renderOpts}) => {
    const Wrapper = ({children}) => (
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    )
    return rtlrender(ui, {wrapper: Wrapper, ...renderOpts})
}

export * from '@testing-library/react';
export {render}