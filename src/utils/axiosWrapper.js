import axios from 'axios';
import store from '../store/configureStore';
import { fetchLogout } from 'core/globalSlice';

const instance = axios.create();

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		const status = err.status || err.response.status;
		if (status === 403 || status === 401) {
			(() => {
				store.dispatch(fetchLogout());
				console.log('logout from interceptor');
			})();
			return Promise.reject(err);
		}

		const config = err.config;
		// If config does not exist or the retry option is not set, reject
		if (!config || !config.retry) return Promise.reject(err);

		// Set the variable for keeping track of the retry count
		config.__retryCount = config.__retryCount || 0;

		// Check if we've maxed out the total number of retries
		if (config.__retryCount >= config.retry) {
			// Reject with the error
			return Promise.reject(err);
		}

		// Increase the retry count
		config.__retryCount += 1;

		// Create new promise to handle exponential backoff
		let backoff = new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function () {
			return axios(config);
		});
	}
);

const defaultParams = {
	withCredentials: true,
	retry: 3,
	retryDelay: 1000,
	headers: {
		Accept: 'application/json;',
		'Content-Type': 'application/json-patch+json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Headers': '*',
	},
};

const axiosWrapper = (url, params) => instance(window.jcApi + url, Object.assign({}, defaultParams, params));

export default axiosWrapper;
