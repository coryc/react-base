//import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

import configureStore from './store/configureStore'

const store = configureStore()

//const history = new HashHistory()

render(
    <Router history={history} routes={routes} />,
    document.getElementById('app')
);
