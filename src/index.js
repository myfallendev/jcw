// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { App } from './core';
import './style.sass';

const isBetaOrProd = document.location.hostname.indexOf('jetcrypto.com') !== -1;
window.jcApi = isBetaOrProd ? '<JC_API>' : document.location.origin;
window.heartbeat = null;
window.buildNumber = '<BUILD_NUMBER>';
window.commit = '<GIT_COMMIT>';
window.EvTimeout = null;

if (isBetaOrProd) {
	Sentry.init({
		dsn: 'https://e533288bd33d46c98c10a1b5ac12b36b@sentry.io/1865666',
		release: window.buildNumber,
	});
	console.log('API PATH', window.jcApi);
	console.log('BUILD NUMBER', window.buildNumber);
	console.log('COMMIT', window.commit);
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
