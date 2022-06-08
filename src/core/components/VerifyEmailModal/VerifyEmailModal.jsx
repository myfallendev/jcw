import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckEmailVerificationCode, fetchNewEmailVerificationCode, resetServerErrorText } from 'core/globalSlice';

let EvTimeout;

export const VerifyEmailModal = ({
	userEmail,
	emailVerifyCode,
	emailVerified,
	serverErrorText,
	successEmailVerify,
	fetching,
	closeModal,
}) => {
	const [codeFromInput, setCodeFromInput] = useState('');
	const [isFetchEmailOnceMore, setIsFetchEmailOnceMore] = useState(false);
	const dispatch = useDispatch();
	const { errors } = useSelector((state) => state.global);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		if (emailVerified) closeModal();
		return () => {
			clearTimeout(EvTimeout);
			closeModal();
		};
	}, []);

	useEffect(() => {
		if (emailVerifyCode && !emailVerified) checkVerifyCode();
	}, [emailVerifyCode, emailVerified]);

	const checkVerifyCode = () => {
		if (codeFromInput && !emailVerified) {
			dispatch(fetchCheckEmailVerificationCode(codeFromInput));
		}
		if (emailVerifyCode && !emailVerified) {
			dispatch(fetchCheckEmailVerificationCode(emailVerifyCode));
		}
	};

	const sendEmailOnceMore = (e) => {
		e.preventDefault();
		setIsFetchEmailOnceMore(true);
		dispatch(fetchNewEmailVerificationCode(userEmail));
		EvTimeout = setTimeout(() => {
			setIsFetchEmailOnceMore(false);
		}, 12000);
	};

	const handleInput = (e) => {
		setCodeFromInput(e.target.value);
	};

	const handleClose = () => {
		document.body.style.overflow = 'auto';
		resetErrors();
		closeModal();
	};

	const resetErrors = () => {
		dispatch(resetServerErrorText());
	};

	return (
		<div className="modal-fullscreen">
			<div className="modal-fullscreen__close" onClick={handleClose}></div>
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
				{!fetching ? (
					<div className="modal-fullscreen__body-wrapper">
						<h3 style={{ textAlign: 'center' }}>Email confirmation</h3>

						{!emailVerified && !successEmailVerify && (
							<div className="">
								<div className="form-group modal-fullscreen__form">
									<label htmlFor="email-verify-code">Email verify code</label>
									<input
										type="text"
										autoComplete={'new-code'}
										className={
											'form-control ' +
											(!successEmailVerify && successEmailVerify !== null ? 'modal-fullscreen__input-error' : '')
										}
										id="email-verify-code"
										placeholder="Email verify code"
										onFocus={resetErrors}
										onChange={handleInput}
									/>
									{/* {!successEmailVerify && successEmailVerify !== null && (
										<p className="modal-fullscreen__input-error-text">Wrong code!</p>
									)} */}
									{errors?.length > 0 && (
										<p className="modal-fullscreen__input-error-text">
											{errors[0].code === 107
												? 'Please, send code request once more'
												: errors[0].code === 201
												? 'Wrong code!'
												: errors[0].value}
										</p>
									)}
								</div>
								<div className="modal-fullscreen__controls">
									<button className="btn btn-orange btn-large" onClick={checkVerifyCode}>
										Confirm
									</button>
								</div>
								{serverErrorText && <p style={{ color: 'rgba(255,0,0,.8)' }}>{serverErrorText}</p>}
								{!isFetchEmailOnceMore ? (
									<div className="modal-fullscreen__controls">
										<p>Don't receive verify code by email?</p>
										<p>
											<button style={{ color: '#428bca' }} onClick={sendEmailOnceMore}>
												Resend verify code
											</button>
										</p>
									</div>
								) : (
									<div className="modal-fullscreen__controls">
										<p>Check your mailbox!</p>
									</div>
								)}
							</div>
						)}

						{successEmailVerify && (
							<div className="modal-fullscreen__success">
								<div className="modal-fullscreen__success-ico">
									<img src="/img/modal-ico/modal-success-ico.png" alt="success" />
								</div>
								<div className="modal-fullscreen__success-text">
									<p>Your email has been confirmed!</p>
									<p>Now you can use the service with full functionality.</p>
								</div>
								<div className="modal-fullscreen__success-controls">
									<button className="btn btn-orange btn-large" onClick={handleClose}>
										Ok
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="loader"></div>
				)}
			</div>
		</div>
	);
};
