// GENERATE ACCESS TOKEN ON THE BACKEND
import snsWebSdk from '@sumsub/websdk';
import React, { useEffect } from 'react';
import { kycToken } from 'api/sumsubstance';
import isDevServer from 'utils/isDevServer';

export const NewSumSubWebSDK = ({ token, user }) => {
	const url = isDevServer ? 'https://test-api.sumsub.com' : 'https://api.sumsub.com';
	const flow = isDevServer ? 'Test_Flow' : 'Standart_verification_flow';
	let snsWebSdkInstance = snsWebSdk
		.Builder(url, flow)
		.withAccessToken(token, async (newAccessTokenCallback) => {
			/* generate a new token and launch WebSDK again */
			let { data } = await kycToken();
			let newAccessToken = await data.response;
			newAccessTokenCallback(newAccessToken);
		})
		.withConf({
			lang: 'en',
			email: user.email || '',
			phone: user.phone, // if available

			onMessage: (type, payload) => {},
			onError: (error) => {
				console.log('WebSDK onError', error);
			},
		})
		.build();

	useEffect(() => {
		snsWebSdkInstance.launch('#sumsub-websdk-container');
	}, [token, user]);

	return <div id="sumsub-websdk-container"></div>;
};
