import React, { useState } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { fetchLogin, resetErrors } from 'core/globalSlice';

import validateEmail from 'utils/validateEmail';

import { PhoneInput } from 'core/components/PhoneInput';

export const LoginWindow = ({ activeLanguage, showRestorePasswordWindow, onRestorePasswordClick }) => {
	const [loginType, setLoginType] = useState('phone');
	const [password, setPassword] = useState('');
	const [emailLoginInput, setEmailLoginInput] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const { showCountriesSelect, phoneInput } = useSelector((state) => state.phoneInput);

	const dispatch = useDispatch();

	const { errors } = useSelector((state) => state.global);

	const handleKeyPress = (e) => {
		if (!showCountriesSelect && e.key === 'Enter') {
			onSubmitBtnClick(e);
		}
	};

	const clearInputErrors = () => {
		setIsEmailValid(true);
		setIsPasswordValid(true);
		dispatch(resetErrors());
	};

	const handleEmailTyping = (e) => {
		setEmailLoginInput(e.target.value);
		setIsEmailValid(validateEmail(e.target.value));
	};

	const handlePasswordTyping = (e) => {
		setPassword(e.target.value);
		setIsPasswordValid(!!e.target.value);
	};

	const handleShowRestorePasswordWindow = (e) => {
		e.preventDefault();
		dispatch(resetErrors());
		onRestorePasswordClick(true);
	};

	const changeLoginType = (e) => {
		e.preventDefault();
		setLoginType(e.target.name);
		clearInputErrors();
	};

	const onSubmitBtnClick = (e) => {
		e.preventDefault();

		const regSectionContainer = document.getElementById('registration-section-container');
		regSectionContainer.classList.add('blur');
		if (loginType === 'phone') {
			const phoneToSend = phoneInput.replace(/\D/gi, '');
			dispatch(fetchLogin(phoneToSend, password));
			return;
		}
		dispatch(fetchLogin(emailLoginInput, password));
	};

	const cnPhoneType = cn('choose-login-type__button', { active: loginType === 'phone' });
	const cnEmailType = cn('choose-login-type__button', { active: loginType === 'email' });

	const cnPhoneField = cn('reg-window__input-field', { unvalidated: !isEmailValid || errors.length });
	const cnEmailField = cn('reg-window__input-field', { unvalidated: !isEmailValid || errors.length });
	const cnPasswordField = cn('reg-window__input-field', { unvalidated: !isPasswordValid || errors.length });
	const cnSubmitButton = cn('reg-window__submit-button submit btn btn-orange', {
		'disabled register-disabled': !isEmailValid || !isPasswordValid,
	});

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="reg-window__login-container reg-window-login"
			onKeyPress={handleKeyPress}
		>
			<div className="reg-window__choose-login-type choose-login-type">
				<button className={cnPhoneType} name={'phone'} onClick={changeLoginType}>
					{activeLanguage.reg_type_phone_text}
				</button>
				<button className={cnEmailType} name={'email'} onClick={changeLoginType}>
					{activeLanguage.reg_type_login_text}
				</button>
			</div>
			{loginType === 'phone' ? (
				<PhoneInput
					activeLanguage={activeLanguage}
					currentStatus="login"
					additionalClass={cnPhoneField}
					clearInputErrors={clearInputErrors}
				/>
			) : (
				<input
					type="text"
					maxLength={100}
					autoComplete={'off'}
					className={cnEmailField}
					placeholder={activeLanguage.reg_login_placeholder}
					onChange={handleEmailTyping}
					onClick={clearInputErrors}
				/>
			)}
			<p className="field-error">
				{showRestorePasswordWindow || isEmailValid ? '' : activeLanguage.required_field_error}
			</p>
			{!showCountriesSelect && (
				<input
					type="password"
					autoComplete={'current-password'}
					className={cnPasswordField}
					placeholder={activeLanguage.password_placeholder}
					onChange={handlePasswordTyping}
					onClick={clearInputErrors}
				/>
			)}
			<p className="field-error">
				{showRestorePasswordWindow || isPasswordValid ? '' : activeLanguage.required_field_error}
			</p>

			{errors.length > 0 && <p className="field-error">{errors.map((err) => err.value)}</p>}

			<p className="reg-window__restore-text">
				{activeLanguage.restore_text + ' '}
				<button className="reg-window__restore-link restore-password" onClick={handleShowRestorePasswordWindow}>
					{activeLanguage.restore_link_text}
				</button>
			</p>

			<div className="reg-window__submit-buttons buttons">
				<button className={cnSubmitButton} onClick={onSubmitBtnClick}>
					{activeLanguage.submit_btn}
				</button>
			</div>
		</form>
	);
};
