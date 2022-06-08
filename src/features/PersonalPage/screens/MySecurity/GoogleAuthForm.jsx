import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'core/components/Loader';
import { ModalContainer } from 'core/components/ModalContainer';
import {
	fetchConfirmGoogleAuth,
	fetchResetGoogleAuth,
	setGoogleAuthConfirmError,
	resetErrors,
} from './googleAuthSlice';

export const GoogleAuthForm = ({ onClose, showGoogleAuthResetForm }) => {
	const dispatch = useDispatch();
	const confirmGoogleAuthCode = useRef();
	const {
		fetching,
		errors,
		requestGoogleAuthResponse,
		googleAuthServerError,
		showGoogleAuthCompletePopup,
		showGoogleAuthResetPopup,
	} = useSelector((state) => state.googleAuth);
	const { user } = useSelector((state) => state.global);

	useEffect(() => {
		return () => dispatch(resetErrors());
	}, []);

	const confirmGoogleAuth = () => {
		let code = confirmGoogleAuthCode.current.value;
		code = code.replace(/ /g, '');
		if (code.length === 6) {
			dispatch(fetchConfirmGoogleAuth(user.phone, code));
		} else {
			dispatch(setGoogleAuthConfirmError());
		}
	};

	const resetGoogleAuthentication = () => {
		let code = confirmGoogleAuthCode.current.value;
		code = code.replace(/ /g, '');
		if (code.length === 6) {
			dispatch(fetchResetGoogleAuth(user.phone, code));
		} else {
			dispatch(setGoogleAuthConfirmError());
		}
	};

	const copyGAcode = (e) => {
		let $target = e.currentTarget;
		$target.classList.add('wallet-events__item-source-copy--pending');
		setTimeout(() => {
			$target.classList.remove('wallet-events__item-source-copy--pending');
		}, 3000);
	};
	return (
		<>
			{Object.keys(requestGoogleAuthResponse).length > 0 && (
				<div className="parameters-container__row" style={{ position: 'relative' }}>
					{fetching && <Loader />}
					<div className={'parameter' + (fetching ? ' blur' : '')}>
						<div className="user-settings__content-container">
							<p>You need to install Google Authenticator application to your device.</p>
							<p>
								You can download it for&nbsp;
								<a
									className="user-settings__link"
									href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
									target="_blank"
									rel="noopener noreferrer"
								>
									iOS
								</a>
								&nbsp;or&nbsp;
								<a
									className="user-settings__link"
									href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
									target="_blank"
									rel="noopener noreferrer"
								>
									Android
								</a>
								.
							</p>
							<img src={requestGoogleAuthResponse.qrCodeImageUrl} alt="" />
						</div>
						<div className="user-settings__content-container--mb"></div>

						<div className="wallet-events__item-source">
							<div className="wallet-events__item-source-input-container">
								<input type="text" readOnly defaultValue={requestGoogleAuthResponse.manualEntrySetupCode} />
							</div>
							<button onClick={copyGAcode} className="wallet-events__item-source-copy" style={{ opacity: '1' }}>
								<svg
									className="wallet-events__item-source-copy--default"
									height="24"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										fill="none"
										height="13"
										rx="2"
										ry="2"
										stroke="#555"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										width="13"
										x="9"
										y="9"
									></rect>
									<path
										d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
										fill="none"
										stroke="#555"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									></path>
								</svg>
								<svg
									className="wallet-events__item-source-copy--copied"
									fill="none"
									height="28"
									stroke="#239d60"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="28"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							</button>
						</div>
					</div>

					{fetching && <Loader />}
					<div className={'parameter' + (fetching ? ' blur' : '')}>
						<div className="user-settings__content-container--mb">
							<h4>Enter code from Google Authenticator application</h4>
							<input
								className={errors.length && errors[0].value ? 'unvalidated' : ''}
								onFocus={() => dispatch(resetErrors())}
								ref={confirmGoogleAuthCode}
								type="text"
								placeholder="Code"
							/>

							<p>{errors.length ? 'Wrong Google Authentication code!' : ''}</p>
							<p>
								{googleAuthServerError
									? 'The web server reported a gateway time-out error. Please try again in a few minutes.'
									: ''}
							</p>
						</div>
						<div className="user-settings__content-container--mb">
							<button onClick={confirmGoogleAuth} className="btn btn-orange btn-large">
								Enable
							</button>
						</div>
					</div>
				</div>
			)}

			{/* googleAuthExist && (
				<div style={{ position: 'relative' }}>
					<div className="parameter parameter--button">
						<button className="btn btn-primary change-password" onClick={this.showFormResetGoogleAuthentication}>
							Disable Google Authentication
						</button>
					</div>
					{fetching && <Loader />} */}
			{showGoogleAuthResetForm && (
				<div style={{ position: 'relative' }}>
					{fetching && <Loader />}
					<div className={'parameter' + (fetching ? ' blur' : '')}>
						<div className="user-settings__content-container--mb">
							<h4>Enter code from Google Authenticator application</h4>
							<input
								className={errors.length && errors[0].value ? 'unvalidated' : ''}
								onFocus={() => dispatch(resetErrors())}
								ref={confirmGoogleAuthCode}
								type="text"
								placeholder="Code"
							/>

							<p>{errors.length ? 'Wrong Google Authentication code!' : ''}</p>
							<p>
								{googleAuthServerError
									? 'The web server reported a gateway time-out error. Please try again in a few minutes.'
									: ''}
							</p>
						</div>
						<div className="user-settings__content-container--mb">
							<button onClick={resetGoogleAuthentication} className="btn btn-orange btn-large">
								Disable
							</button>
						</div>
					</div>
				</div>
			)}

			{showGoogleAuthCompletePopup && (
				<ModalContainer fnmodalvisible={onClose}>
					<div className="complete-popup">
						<div style={{ textAlign: 'center', margin: '15px 0' }}>
							<img style={{ width: '100px' }} src="/img/modal-ico/modal-success-ico.png" alt="" />
						</div>
						<div className="complete-popup__title">Google Authenticator successfully added to Your account.</div>
						<div className="complete-popup__controls">
							<button onClick={onClose} className="btn btn-orange complete-popup__controls-btn">
								OK
							</button>
						</div>
					</div>
				</ModalContainer>
			)}

			{showGoogleAuthResetPopup && (
				<ModalContainer fnmodalvisible={onClose}>
					<div className="complete-popup">
						<div style={{ textAlign: 'center', margin: '15px 0' }}>
							<img style={{ width: '100px' }} src="/img/modal-ico/modal-success-ico.png" alt="" />
						</div>
						<div className="complete-popup__title">Google Authenticator successfully removed from Your account.</div>
						<div className="complete-popup__controls">
							<button onClick={onClose} className="btn btn-orange complete-popup__controls-btn">
								OK
							</button>
						</div>
					</div>
				</ModalContainer>
			)}
		</>
	);
};
