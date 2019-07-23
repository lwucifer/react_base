import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import {createStore, applyMiddleware, compose} from 'redux';
// Middleware
import loggingMiddleware from './reducers/middleware/loggingMiddleware'; 
// Import file
import './index.css';
import App from './App';
import i18n from './i18n/index';
import * as serviceWorker from './serviceWorker';
import appReducers from './reducers/index';
// font
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( 
    appReducers, 
    composeEnhancer(applyMiddleware(thunk, loggingMiddleware))
);

ReactDOM.render(
    <Provider store={ store }>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>Loading translations...</div>}>
                <App />
            </Suspense>
        </I18nextProvider>
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
