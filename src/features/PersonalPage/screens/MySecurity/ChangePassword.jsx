import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalContainer } from 'core/components/ModalContainer';
import { Loader } from 'core/components/Loader';
import { fetchChangePassword, resetErrors, resetPasswordChange } from 'core/globalSlice';

export const ChangePassword = ({ activeLanguage, closePopup }) => {
	const dispatch = useDispatch();
	const [passwordChangeFieldsAreFilled, setPasswordChangeFieldsAreFilled] = useState(false);
	const { user, fetching, errors, serverError, passwordChanged } = useSelector((state) => state.global);
	const oldPassword = useRef();
	const firstNewPassword = useRef();
	const secondNewPassword = useRef();
	const verificationPassword = useRef();

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
			dispatch(resetPasswordChange());
		};
	}, []);

	const changePassword = () => {
		if (!passwordChangeFieldsAreFilled) return;
		dispatch(
			fetchChangePassword(oldPassword.current.value, firstNewPassword.current.value, secondNewPassword.current.value)
		);
	};

	const handlePasswordChangeFieldTyping = () => {
		const oldPasswordIsValid = oldPassword.current.value.length > 5;
		const firstPasswordIsValid = firstNewPassword.current.value.length > 5;
		const secondPasswordIsValid = secondNewPassword.current.value.length > 5;

		const passwordsAreEquals =
			oldPassword.current.value === firstNewPassword.current.value ||
			oldPassword.current.value === secondNewPassword.current.value;
		const newPasswordsAreEquals = firstNewPassword.current.value === secondNewPassword.current.value;

		setPasswordChangeFieldsAreFilled(
			oldPasswordIsValid &&
				firstPasswordIsValid &&
				secondPasswordIsValid &&
				!passwordsAreEquals &&
				newPasswordsAreEquals
		);
	};

	const showAdditionalField = user?.errorCode === 2;
	const allFieldsClass = errors.length > 0 ? 'unvalidated' : '';

	return (
		<ModalContainer title={activeLanguage.change_password_text} fnmodalvisible={closePopup}>
			{passwordChanged ? (
				<div className="security-data-popup">
					<p className="security-data-popup__text--completed">{activeLanguage.change_password_success_text}</p>
					<button className="btn btn-primary btn-large security-data-popup__button" onClick={closePopup}>
						{activeLanguage.ok_btn}
					</button>
					{fetching && <Loader />}
				</div>
			) : (
				<div className={'security-data-popup' + (fetching ? ' blur' : '')}>
					<input
						type="password"
						className={allFieldsClass}
						//onClick={clearChangePasswordErrors}
						placeholder={activeLanguage.enter_old_password_placeholder}
						ref={oldPassword}
						onChange={handlePasswordChangeFieldTyping}
					/>
					<input
						type="password"
						className={allFieldsClass}
						//onClick={clearChangePasswordErrors}
						placeholder={activeLanguage.enter_new_password_placeholder}
						ref={firstNewPassword}
						onChange={handlePasswordChangeFieldTyping}
					/>
					<input
						type="password"
						className={allFieldsClass}
						//onClick={clearChangePasswordErrors}
						placeholder={activeLanguage.confirm_new_password_placeholder}
						ref={secondNewPassword}
						onChange={handlePasswordChangeFieldTyping}
					/>
					{errors.length > 0 && errors.map((err) => <p className="field-error">{err.value}</p>)}
					{serverError && (
						<p className="field-error">
							The web server reported a gateway time-out error. Please try again in a few minutes.
						</p>
					)}
					{showAdditionalField && (
						<div className="verification-block">
							<p className="field-error verification-block__title">
								{activeLanguage.verificationMessage}
								<b>{activeLanguage.verificationType[user?.verificationType] /*TODO: check if this is ok*/}</b>
							</p>
							<input type="text" className="verification-block__input" ref={verificationPassword} />
						</div>
					)}
					<button
						className={
							'btn btn-primary btn-large security-data-popup__button' +
							(!passwordChangeFieldsAreFilled ? ' disabled' : '')
						}
						onClick={changePassword}
						disabled={!passwordChangeFieldsAreFilled}
					>
						{activeLanguage.submit_btn}
					</button>
				</div>
			)}
			{fetching && <Loader />}
		</ModalContainer>
	);
};
