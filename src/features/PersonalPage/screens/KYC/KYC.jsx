import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKYCStatus, fetchKYCToken, KYC_STATUS } from '../../userSettingsSlice';
import { Loader } from 'core/components/Loader';
import { ModalContainer } from 'core/components/ModalContainer';
import { NewSumSubWebSDK } from './components/NewSumsubWebSDK';

export const KYC = () => {
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.global);
	const { languages, activeLanguage } = useSelector((state) => state.language);
	const currentLanguage = languages[activeLanguage];
	const { fetching, errors, kycStatus, kycDate, kycToken } = useSelector((state) => state.newUserSettings);

	useEffect(() => {
		dispatch(fetchKYCToken());
	}, [dispatch]);

	useEffect(() => {
		if (!showModal) dispatch(fetchKYCStatus());
	}, [showModal]);

	const toggleModal = () => setShowModal((state) => !state);

	return (
		<div className="personal-settings">
			{fetching ? (
				<Loader />
			) : typeof kycStatus !== 'undefined' && kycToken ? (
				<div className="parameters-container person-verification">
					<div className="parameter">
						<p className="px16-semipale-text">{currentLanguage.kyc_status_title} :</p>
						<p className="value">{currentLanguage.kyc_status[kycStatus].toUpperCase()}</p>
					</div>

					<div className="parameter">
						<p className="px16-semipale-text">{currentLanguage.kyc_data_provided_on} :</p>
						<p className="value">{kycDate || '-'}</p>
					</div>

					<div className="parameter parameter--button">
						<button className="btn btn-primary disabled review-data">{currentLanguage.kyc_review_data}</button>
					</div>

					<div className="parameter parameter--button">
						<button
							onClick={toggleModal}
							className={`btn btn-primary btn-orange pass-kyc ${
								kycStatus === KYC_STATUS.ReviewedOK || kycStatus === KYC_STATUS.ReviewedBad ? 'disabled' : ''
							}`}
							disabled={kycStatus === KYC_STATUS.ReviewedOK || kycStatus === KYC_STATUS.ReviewedBad}
						>
							{currentLanguage.kyc_pass}
						</button>
					</div>

					{user.id && showModal && (
						<ModalContainer title={'KYC Verification System'} fnmodalvisible={toggleModal}>
							<NewSumSubWebSDK user={user} token={kycToken} />
						</ModalContainer>
					)}
				</div>
			) : errors?.length ? (
				errors.map((err) => err.value)
			) : (
				''
			)}
		</div>
	);
};
