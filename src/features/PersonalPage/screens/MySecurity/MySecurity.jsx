import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckGoogleAuth, fetchRequestGoogleAuth, closeResultPopups } from './googleAuthSlice';
import { VerifiedBadge } from '../../components/VerifiedBadge';
import { ChangePassword } from './ChangePassword';
import { ChangePin } from './ChangePin';
import { GoogleAuthForm } from './GoogleAuthForm';
import Clipboard from 'clipboard';

export const MySecurity = ({ activeLanguage }) => {
	const dispatch = useDispatch();
	const { googleAuthExist } = useSelector((state) => state.googleAuth);
	const { user } = useSelector((state) => state.global);
	let clipboard;
	const [showChangePinPopup, setShowChangePinPopup] = useState(false);
	const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
	const [showGoogleAuthResetForm, setShowGoogleAuthResetForm] = useState(false);

	useEffect(() => {
		if (!googleAuthExist) dispatch(fetchCheckGoogleAuth(user.phone));
	}, []);

	const requestGoogleAuthentication = () => {
		dispatch(fetchRequestGoogleAuth(user.phone));
		setTimeout(() => {
			let copyFields = document.querySelectorAll('.wallet-events__item-source-copy');
			// Fucking IE11!!!
			for (let i = 0; i < copyFields.length; i++) {
				let transactionInputField = copyFields[i].previousElementSibling;
				clipboard = new Clipboard(copyFields[i], {
					action: 'copy',
					target: () => transactionInputField,
				});
			}
		}, 500);
	};

	const handleClose = () => {
		setShowGoogleAuthResetForm(false);
		dispatch(closeResultPopups());
	};
	return (
		<div className="personal-settings">
			<div className="password parameters-container">
				<div className="head">
					<p className="title">{activeLanguage.password_setting_title}</p>
					<p className="px16-semipale-text">{activeLanguage.password_setting_description}</p>
				</div>
				<div className="parameter parameter--button">
					<button className="btn btn-primary change-password" onClick={() => setShowChangePasswordPopup(true)}>
						{activeLanguage.change_password_text}
					</button>
				</div>
				{showChangePasswordPopup && (
					<ChangePassword activeLanguage={activeLanguage} closePopup={() => setShowChangePasswordPopup(false)} />
				)}
			</div>

			<div className="google-auth parameters-container">
				<div className="head">
					<p className="title">
						Google Authentication{' '}
						<span className="px16-semipale-text verified_badge">
							{googleAuthExist && <VerifiedBadge text="Enabled" noMarginLeft={true} />}
						</span>
					</p>
					<p className="px16-semipale-text">{activeLanguage.google_auth_notice}</p>
				</div>

				{!googleAuthExist ? (
					<div className="parameter parameter--button">
						<button className="btn btn-primary change-password" onClick={requestGoogleAuthentication}>
							Enable Google Authentication
						</button>
					</div>
				) : (
					<div className="parameter parameter--button">
						<button className="btn btn-primary change-password" onClick={() => setShowGoogleAuthResetForm(true)}>
							Disable Google Authentication
						</button>
					</div>
				)}

				<GoogleAuthForm
					activeLanguage={activeLanguage}
					showGoogleAuthResetForm={showGoogleAuthResetForm}
					onClose={handleClose}
				/>
			</div>

			<div className="cash-withdraw-pin parameters-container">
				<div className="head">
					<p className="title">Cash Withdrawal PIN</p>
					<p className="px16-semipale-text">
						This PIN-code is used for access to your accounts in Trovemat for cash withdrawal
					</p>
				</div>
				<div className="parameter parameter--button">
					<button className="btn btn-primary change-password" onClick={() => setShowChangePinPopup(true)}>
						Change PIN
					</button>
				</div>
				{showChangePinPopup && (
					<ChangePin activeLanguage={activeLanguage} onClose={() => setShowChangePinPopup(false)} />
				)}
			</div>
		</div>
	);
};
