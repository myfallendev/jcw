import React, { useState, useEffect } from 'react';
//import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { fetchRestorePassword, fetchRestorePasswordConfirm, resetPasswordRestoreForm } from 'core/globalSlice';

//import * as userActions from 'actions/UserActions';
import validateEmail from 'utils/validateEmail';

import { PhoneInput } from 'core/components/PhoneInput';
import { ModalContainer } from 'core/components/ModalContainer';

export const PasswordRestoreModals = ({ activeLanguage, showRestorePasswordWindow, setShowRestorePasswordWindow }) => {
	const dispatch = useDispatch();
	const [loginType, setLoginType] = useState('phone');
	const [loginValue, setLoginValue] = useState('');
	const [confirmationCode, setConfirmationCode] = useState('');
	const [newPassword, setNewPassword] = useState({ first: '', second: '' });
	const [emailIsValid, setEmailIsValid] = useState(true);
	const [phoneIsValid, setPhoneIsValid] = useState(true);
	const [codeIsValid, setCodeIsValid] = useState(true);
	const [passwordIsValid, setPasswordIsValid] = useState({ first: true, second: true });
	const [passwordsAreEqual, setPasswordsAreEqual] = useState(true);
	const { errors, fetching, fetchingPasswordChange, passwordChanged, showRestorePasswordForm } = useSelector(
		(state) => state.global
	);

	useEffect(() => {
		setLoginValue('');
		setEmailIsValid(true);
		setPhoneIsValid(true);
	}, [loginType]);

	useEffect(() => {
		if (showRestorePasswordForm) setShowRestorePasswordWindow(false);
	}, [showRestorePasswordForm]);

	const clearInputErrors = () => {
		setPhoneIsValid(true);
		setEmailIsValid(true);
		setPasswordIsValid({ first: true, second: true });
		setCodeIsValid(true);
		setPasswordsAreEqual(true);
	};

	const applyChangePassword = (e) => {
		e.preventDefault();

		const { first: firstPassword, second: secondPassword } = newPassword;

		if (firstPassword !== secondPassword) {
			setPasswordsAreEqual(false);
			setCodeIsValid(!!confirmationCode);
			return;
		}

		if (confirmationCode && firstPassword.length > 5 && secondPassword.length > 5) {
			dispatch(fetchRestorePasswordConfirm(loginValue, confirmationCode, firstPassword, secondPassword));
		} else {
			setCodeIsValid(!!confirmationCode);
			setPasswordIsValid({ first: firstPassword.length > 5, second: secondPassword.length > 5 });
		}
	};

	const closeRestorePopup = () => {
		setShowRestorePasswordWindow(false);
		clearInputErrors();
		setNewPassword({ first: '', second: '' });
		setConfirmationCode('');
		dispatch(resetPasswordRestoreForm());
	};

	const onRestoreBtnClick = () => {
		//const { loginTypeIsPhone, phone, phoneIsValid, loginFieldIsFilled } = this.state;
		//const { userActions } = this.props;

		if (loginType === 'phone') {
			if (phoneIsValid) {
				//this.phoneLoginValueToSend = phone;
				dispatch(fetchRestorePassword(loginValue));
			} else {
				setPhoneIsValid(false);
				return;
			}
		} else {
			//const emailFieldValue = this.refs.emailField.value.slice(0, 255);
			if (emailIsValid) {
				//this.phoneLoginValueToSend = emailFieldValue;
				dispatch(fetchRestorePassword(loginValue));
			} else {
				setEmailIsValid(false);
			}
		}
	};

	const handleEmailTyping = (e) => {
		const emailIsValid = validateEmail(e.target.value);
		setLoginValue(e.target.value);
		setEmailIsValid(emailIsValid);
		// let isFilled = validateEmail(value);

		// if (isFilled === this.state.loginFieldIsFilled) return;

		// this.setState({
		// 	loginFieldIsFilled: isFilled,
		// });
	};

	const handlePhoneTyping = (value, isValid) => {
		setPhoneIsValid(isValid);
		setLoginValue(value);
	};

	const renderFirstStep = () => {
		const fieldsAreFilled = !!(loginType === 'phone' ? phoneIsValid : emailIsValid);

		const phoneInputClassName = cn('reg-window__input-field', { unvalidated: !phoneIsValid || errors.length > 0 });
		const emailInputClassName = cn('reg-window__input-field', { unvalidated: !emailIsValid || errors.length > 0 });
		//const isLoading = fetchingPasswordRestore && user !== undefined && !user.show_errors;

		return (
			<ModalContainer
				fnmodalvisible={closeRestorePopup}
				disableOverlayClick={fetchingPasswordChange}
				additionalClass={'password-restore-popup'}
				isLoading={fetchingPasswordChange}
				title={activeLanguage.restore_popup_title}
			>
				<div>
					<div className="reg-window__choose-login-type choose-login-type">
						<button
							className={'choose-login-type__button ' + (loginType === 'phone' ? ' active' : '')}
							onClick={() => setLoginType('phone')}
						>
							{activeLanguage.reg_type_phone_text}
						</button>
						<button
							className={'choose-login-type__button ' + (loginType === 'email' ? ' active' : '')}
							onClick={() => setLoginType('email')}
						>
							{activeLanguage.reg_type_login_text}
						</button>
					</div>
					{loginType === 'phone' ? (
						<PhoneInput
							currentStatus="restore"
							additionalClass={phoneInputClassName}
							onChange={handlePhoneTyping}
							handleClick={clearInputErrors}
						/>
					) : (
						<input
							type="text"
							maxLength={100}
							className={emailInputClassName}
							placeholder={activeLanguage.reg_login_placeholder}
							onChange={handleEmailTyping}
							onClick={clearInputErrors}
						/>
					)}
				</div>

				<div className="password-restore-popup__field-error-container field-error-container">
					{/* {showErrors && user.timeoutError && <p className="field-error">{activeLanguage.timeout_error}</p>} */}
					{errors.length > 0 && errors[0].value && <p className="field-error">{errors[0].value}</p>}
					{(!phoneIsValid || !emailIsValid) && (
						<p className="reg-window__field-error field-error">{activeLanguage.required_field_error}</p>
					)}
				</div>

				<div className="reg-window__buttons buttons">
					<button
						className={
							'reg-window__submit-button submit btn btn-orange' + (fieldsAreFilled ? '' : ' disabled register-disabled')
						}
						onClick={onRestoreBtnClick}
					>
						{activeLanguage.submit_btn}
					</button>
				</div>
			</ModalContainer>
		);
	};

	const renderSecondStep = () => {
		const codeIsWrong = !codeIsValid;
		const codeInputClassName = cn('reg-window__input-field', { unvalidated: codeIsWrong });
		const codeInputErrorText = codeIsWrong ? activeLanguage.confirmation_code_error_text : '';

		const firstPassIsWrong = !passwordIsValid.first || (errors.length && errors[0].Password);
		const firstPassClassName = cn('reg-window__input-field', { unvalidated: firstPassIsWrong || !passwordsAreEqual });
		const firstPassErrorText = passwordIsValid.first ? '' : activeLanguage.new_password_length_error;

		const secondPassIsWrong = !passwordIsValid.second || (errors.length > 0 && errors[0].Password);
		const secondPassClassName = cn('reg-window__input-field', { unvalidated: secondPassIsWrong || !passwordsAreEqual });
		const secondPassErrorText = passwordIsValid.second ? '' : activeLanguage.new_password_length_error;

		return (
			<ModalContainer
				fnmodalvisible={closeRestorePopup}
				disableOverlayClick={true}
				additionalClass={'password-restore-popup'}
				isLoading={fetchingPasswordChange}
				title={activeLanguage.restore_password_title}
			>
				<form autoComplete={'off'}>
					<p className="restore-password-popup__subtitle">{activeLanguage.restore_password_description}</p>
					<input
						type="text"
						autoComplete={'off'}
						className={codeInputClassName}
						placeholder={activeLanguage.confirmation_code_placeholder}
						onClick={clearInputErrors}
						onChange={(e) => setConfirmationCode(e.target.value)}
					/>
					<p className="field-error">{codeInputErrorText}</p>
					<input
						type="password"
						autoComplete={'new-password'}
						id="restore-password-popup__password-field"
						className={firstPassClassName}
						placeholder={activeLanguage.new_password_placeholder}
						onClick={clearInputErrors}
						// onBlur={() => {
						// 	setPasswordIsValid({ ...passwordIsValid, first: newPassword.first > 5 })
						// }}
						onChange={(e) => setNewPassword({ ...newPassword, first: e.target.value })}
					/>
					<p className="field-error">{firstPassErrorText}</p>
					<input
						type="password"
						autoComplete={'new-password'}
						id="restore-password-popup__password-confirmation-field"
						className={secondPassClassName}
						placeholder={activeLanguage.new_password_repeat_placeholder}
						onClick={clearInputErrors}
						// onBlur={() => {
						// 	setPasswordIsValid({ ...passwordIsValid, second: newPassword.second > 5 })
						// }}
						onChange={(e) => setNewPassword({ ...newPassword, second: e.target.value })}
					/>
					<p className="field-error">{secondPassErrorText}</p>
					{!passwordsAreEqual && <p className="field-error">{activeLanguage.passwords_should_be_equal}</p>}
					{errors.length > 0 && errors[0].value && <p className="field-error">{errors[0].value}</p>}
					<button
						className="reg-window__submit-button btn btn-orange reg-window__button close-change-password-popup"
						onClick={applyChangePassword}
					>
						{activeLanguage.submit_btn}
					</button>
					<button className="reg-window__submit-button btn btn-primary close-popup" onClick={closeRestorePopup}>
						{activeLanguage.cancel_btn}
					</button>
				</form>
			</ModalContainer>
		);
	};

	const renderThirdStep = () => {
		return (
			<ModalContainer fnmodalvisible={closeRestorePopup} title={activeLanguage.restore_popup_title}>
				<p className="restore-password-success-popup__text">{activeLanguage.change_password_success_message_title}</p>
				<button className="btn btn-orange restore-password-success-popup__close-button" onClick={closeRestorePopup}>
					{activeLanguage.ok_btn}
				</button>
			</ModalContainer>
		);
	};

	if (showRestorePasswordWindow) {
		return renderFirstStep();
	} else if (showRestorePasswordForm && passwordChanged) {
		return renderThirdStep();
	} else if (showRestorePasswordForm) {
		return renderSecondStep();
	} else {
		return null;
	}
};
