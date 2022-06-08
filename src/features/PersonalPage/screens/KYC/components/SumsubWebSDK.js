import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSubmitUserApplicantId, fetchSubmitUserApplicationComplete } from '../../../userSettingsSlice';

export const SumSubWebSDK = ({ userID, token }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		window.idensic.init(
			'#idensic',
			{
				// provide your clientId (can be seen in the demo)
				clientId: 'jetcrypto',
				// access token for specific externalUserId
				accessToken: token,
				// may be some additional parameters, see the Demo to see which ones, e.g.
				externalUserId: userID,

				includedCountries: null,
				excludedCountries: [
					'AFG',
					'BHS',
					'PRK',
					'ETH',
					'GHA',
					'IRN',
					'IRQ',
					'KGZ',
					'LBY',
					'PAK',
					'SRB',
					'LKA',
					'SDN',
					'SYR',
					'YEM',
				],
				navConf: {
					skipWelcomeScreen: false,
					skipAgreementsScreen: false,
					skipReviewScreen: false,
					registration: 'disabled',
				},
				uiConf: {
					lang: 'en',
					steps: {
						SELFIE2: {
							videoRequired: 'enabled',
						},
						COMPANY: {
							skipBeneficiariesScreen: false,
							deprecateSendEmailsForBeneficiaries: false,
							beneficiaryRequiredIdDocs: {
								docSets: [
									{
										idDocSetType: 'IDENTITY',
										types: ['ID_CARD', 'PASSPORT', 'DRIVERS', 'RESIDENCE_PERMIT'],
										fields: null,
									},
									{
										idDocSetType: 'SELFIE',
										types: ['SELFIE'],
										fields: null,
									},
								],
							},
						},
					},
				},
				documentsByCountries: {},
			},
			// function for the WebSDK callbacks
			function (messageType, payload) {
				// e.g. just logging the incoming messages
				console.log('Idensic message:', messageType, payload);

				if (messageType === 'idCheck.onApplicantCreated' && payload.applicantId)
					dispatch(fetchSubmitUserApplicantId(payload.applicantId));

				if (messageType === 'idCheck.onApplicantSubmitted') dispatch(fetchSubmitUserApplicationComplete());
			}
		);
	}, [userID, token, dispatch]);

	return <div id="idensic"></div>;
};
