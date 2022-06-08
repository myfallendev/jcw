import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChangePin, resetChangePinState } from './changePinSlice';

import { ModalContainer } from 'core/components/ModalContainer';
import { Loader } from 'core/components/Loader';

export const ChangePin = ({ activeLanguage, onClose }) => {
	const dispatch = useDispatch();
	const [pin, setPin] = useState({ firstPIN: '', secondPIN: '' });
	const [verificationCode, setVerificationCode] = useState('');
	const { fetching, errors, verificationType, pinIsWrong, changePINSuccess, show500Msg } = useSelector(
		(state) => state.changePin
	);

	useEffect(() => {
		return () => dispatch(resetChangePinState());
	}, []);

	const handleClose = () => {
		setPin({ firstPIN: '', secondPIN: '' });
		onClose();
	};

	const handlePINInput = (e) => {
		e.preventDefault();
		const pattern = /^[0-9]{0,12}$/;
		if (pattern.test(e.target.value)) {
			setPin({ ...pin, [e.target.name]: e.target.value });
		}
	};

	const sendVerificationCode = () => {
		dispatch(fetchChangePin({ verificationCode, verificationType }));
		setVerificationCode('');
	};

	const handleVerificationCodeInput = (e) => {
		setVerificationCode(e.target.value);
	};

	const submitPINIsDisabled = (!pin.firstPIN && !pin.secondPIN) || pin.firstPIN !== pin.secondPIN;

	const afterVerificationMsg = pinIsWrong
		? 'Wrong verification code!'
		: errors?.length
		? 'Change PIN failed! Try again.'
		: changePINSuccess
		? 'Your PIN Code is changed.'
		: show500Msg
		? 'The web server reported a gateway time-out error. Please try again in a few minutes.'
		: '';

	return (
		<ModalContainer title="Change PIN" fnmodalvisible={handleClose}>
			{!changePINSuccess && !verificationType && (
				<div className={'security-data-popup' + (fetching ? ' blur' : '')}>
					<input
						type="password"
						autoComplete={'new-password'}
						className={pin.firstPIN.length < 4 ? 'unvalidated' : ''}
						placeholder={'Enter new PIN (from 4 to 12 digits)'}
						name="firstPIN"
						onChange={handlePINInput}
						value={pin.firstPIN}
					/>
					<input
						type="password"
						autoComplete={'new-password'}
						className={pin.secondPIN.length < 4 ? 'unvalidated' : ''}
						placeholder={'Repeat new PIN'}
						name="secondPIN"
						onChange={handlePINInput}
						value={pin.secondPIN}
					/>
					<button
						className={
							'btn btn-primary btn-large security-data-popup__button' + (submitPINIsDisabled ? ' disabled' : '')
						}
						onClick={() => dispatch(fetchChangePin({ newPin: pin.secondPIN }))}
						disabled={submitPINIsDisabled}
					>
						{activeLanguage.submit_btn}
					</button>
					{fetching && <Loader />}
				</div>
			)}
			{verificationType && (
				<div className={'security-data-popup'}>
					<p className="security-data-popup__text--completed">{`${activeLanguage.verificationMessage} ${
						activeLanguage.verificationType[verificationType - 1]
					}`}</p>
					<input
						type="text"
						autoComplete={'off'}
						className={verificationCode.length < 4 ? 'unvalidated' : ''}
						placeholder={'******'}
						name="verificationCodeInput"
						onChange={handleVerificationCodeInput}
						value={verificationCode}
					/>
					<button className="btn btn-primary btn-large security-data-popup__button" onClick={sendVerificationCode}>
						{activeLanguage.ok_btn}
					</button>
					{fetching && <Loader />}
				</div>
			)}
			{(pinIsWrong || errors.length || changePINSuccess || show500Msg) && (
				<div className={'security-data-popup' + (fetching ? ' blur' : '')}>
					<p className="security-data-popup__text--completed">{afterVerificationMsg}</p>
					<button className="btn btn-primary btn-large security-data-popup__button" onClick={handleClose}>
						{activeLanguage.ok_btn}
					</button>
				</div>
			)}
		</ModalContainer>
	);
};
