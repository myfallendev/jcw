import React, { useState, useEffect } from 'react';
import validateEmail from 'utils/validateEmail';
import cn from 'classnames';

export const SetEmailFormModal = ({
	fetchingUserInfo,
	emailIsSet,
	errors,
	resetErrors,
	hideSetEmailPopup,
	setEmailSubmit,
}) => {
	const [inputVal, setInputVal] = useState('');
	const [inputVerified, setInputVerified] = useState(false);
	const inputCns = cn('form-control', { valid: inputVerified });

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const handleInputChange = (e) => {
		const val = e.target.value;
		setInputVal(val);
		setInputVerified(validateEmail(val));
	};

	const closeModal = () => {
		document.body.style.overflow = 'auto';
		hideSetEmailPopup();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setEmailSubmit(inputVal);
	};

	return (
		<div className="modal-fullscreen">
			<div className="modal-fullscreen__close" onClick={closeModal}></div>
			<div className="modal-fullscreen__header">
				<img
					className="logo-svg modal-fullscreen__header-logo"
					src="/img/jc_logo_w_jetiks.svg"
					width="226"
					height="33"
					alt="Jetcrypto"
				/>
				<span className="logo-svg modal-fullscreen__header-title"></span>
			</div>
			<div className="modal-fullscreen__body">
				{!fetchingUserInfo ? (
					<div className="modal-fullscreen__body-wrapper">
						{emailIsSet && (
							<div className="modal-fullscreen__success">
								<div className="modal-fullscreen__success-ico">
									<img src="/img/modal-ico/modal-success-ico.png" alt="success-icon" />
								</div>
								<div className="modal-fullscreen__success-text">
									<p>Please, check your mailbox and verify your email address.</p>
								</div>
								<div className="modal-fullscreen__success-controls">
									<button className="btn btn-orange btn-large" onClick={closeModal}>
										Ok
									</button>
								</div>
							</div>
						)}
						{!emailIsSet && (
							<form className="form-group modal-fullscreen__form" autoComplete={'off'}>
								<label htmlFor="change-email">
									Enter your email address, so we can provide the cryptowallet services at full.
								</label>
								<input
									className={inputCns}
									type="text"
									onFocus={resetErrors}
									value={inputVal}
									id="change-email"
									autoComplete={'new-email'}
									onChange={handleInputChange}
								/>
								{errors && errors.length > 0 && <p className="modal-fullscreen__input-error-text">{errors[0].value}</p>}
								<div className="modal-fullscreen__controls">
									<button
										type="submit"
										className="btn btn-orange btn-large"
										disabled={!inputVerified}
										onClick={handleSubmit}
									>
										Confirm
									</button>
								</div>
							</form>
						)}
					</div>
				) : (
					<div className="loader"></div>
				)}
			</div>
		</div>
	);
};
