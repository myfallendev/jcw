import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, resetErrors } from 'core/globalSlice';
import cn from 'classnames';
import validateEmail from 'utils/validateEmail';

import { PhoneInput } from 'core/components/PhoneInput';

export const RegWindow = ({ activeLanguage, showRestorePasswordWindow }) => {
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [email, setEmail] = useState('');
	const { errors } = useSelector((state) => state.global);
	const { phoneIsValid, phoneInput } = useSelector((state) => state.phoneInput);

	const dispatch = useDispatch();

	const clearInputErrors = () => {
		dispatch(resetErrors());
	};

	const handleEmailTyping = (e) => {
		const value = e.target.value;
		setEmailIsValid(validateEmail(value));
		setEmail(value);
	};

	const handleTermsAgreeClick = (e) => {
		const value = e.target.checked;
		setTermsAgreed(value);
	};

	const handleRestorePasswordClick = (e) => {
		e.preventDefault();
		clearInputErrors();
		showRestorePasswordWindow();
	};

	const onSubmitBtnClick = (e) => {
		e.preventDefault();
		if (!emailIsValid || !phoneIsValid || !termsAgreed) return;
		const referralLinkId = localStorage.getItem('referralLinkId') || null;
		const regSectionContainer = document.getElementById('registration-section-container');
		regSectionContainer.classList.add('blur');
		const phone = phoneInput.replace(/\D/gi, '');
		dispatch(fetchRegister(email, phone, referralLinkId));
	};

	const hasErrors = errors.length > 0;
	const phoneInputClass = cn('reg-window__input-field', { unvalidated: hasErrors || !phoneIsValid });
	const emailInputClass = cn('reg-window__input-field', { unvalidated: hasErrors || !emailIsValid });
	const submitButtonClass = cn('reg-window__submit-button submit btn btn-orange', {
		'disabled register-disabled': !emailIsValid || !phoneIsValid || !termsAgreed,
	});

	const errorText = hasErrors && errors[0].value;
	const backendErrorText = errors?.Phone || errors?.Login;

	return (
		<form autoComplete={'off'}>
			<p>{activeLanguage.reg_phone_notice}</p>
			<PhoneInput
				currentStatus="reg"
				activeLanguage={activeLanguage}
				additionalClass={phoneInputClass}
				clearInputErrors={clearInputErrors}
			/>
			<p className="field-error"></p>
			<input
				type="text"
				maxLength={100}
				className={emailInputClass}
				placeholder={activeLanguage.reg_login_placeholder}
				onChange={handleEmailTyping}
				onClick={clearInputErrors}
			/>
			{errorText && <p className="field-error">{errorText}</p>}
			{backendErrorText && <p className="field-error">{backendErrorText}</p>}
			<p className="reg-window__restore-text">
				{activeLanguage.restore_text + ' '}
				<button className="reg-window__restore-link restore-password" onClick={handleRestorePasswordClick}>
					{activeLanguage.restore_link_text}
				</button>
			</p>

			<div className="terms-and-privacy-policy">
				<div className="terms-and-privacy-policy__checkbox-container">
					<input id="terms-and-privacy-policy__checkbox" type="checkbox" onClick={handleTermsAgreeClick} />
					<label htmlFor="terms-and-privacy-policy__checkbox" className="terms-and-privacy-policy__label" />
				</div>
				<span className="terms-and-privacy-policy__text">{activeLanguage.terms_and_privacy_policy_done}</span>
				<a className="terms-and-privacy-policy__link" target="_blank" href="./docs/JetCrypto_Terms_of_Use.pdf">
					{activeLanguage.terms_and_conditions}
				</a>{' '}
				{activeLanguage.andWord + ' '}
				<a className="terms-and-privacy-policy__link" target="_blank" href="./docs/JetCrypto_Privacy_Policy.pdf">
					{activeLanguage.privacy_policy}
				</a>
			</div>

			<div className="reg-window__submit-buttons buttons">
				<button id="reg-button-submit" className={submitButtonClass} onClick={onSubmitBtnClick}>
					{activeLanguage.submit_btn}
				</button>
			</div>
		</form>
	);
};
