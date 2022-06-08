//import { bindActionCreators } from 'redux';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors, fetchChangePassword } from 'core/globalSlice';

export const PasswordChange = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState({});
	const [formFilled, setFormFilled] = useState(false);
	const [errorText, setErrorText] = useState([]);
	const { user, fetching, errors } = useSelector((state) => state.global);

	const { passwordExpired } = user;

	const handleInputChange = (e) => {
		setErrorText([]);
		setInput({ ...input, [e.target.id]: e.target.value });
		if (errors?.length) {
			dispatch(resetErrors());
		}
		if (input.oldPwd && input.newPwd && input.confirmNewPwd) {
			setFormFilled(true);
		}
	};

	const handleSubmit = () => {
		let _errors = [];
		if (input.oldPwd === input.newPwd) {
			_errors.push('Old and new passwords must not match');
		}
		if (input.newPwd !== input.confirmNewPwd) {
			_errors.push('New Passwords do not match');
		}
		setErrorText(_errors);
		if (!_errors.length) {
			dispatch(fetchChangePassword(input.oldPwd, input.newPwd, input.confirmNewPwd));
		} else {
			setFormFilled(false);
		}
	};

	return (
		<div className="password-change">
			<div className={'password-change__wrapper' + (fetching ? ' password-change__wrapper--blur' : '')}>
				<div className="password-change__container">
					<h3>Your password has expired.</h3>
					<h3>Enter a new password:</h3>
					<label htmlFor="oldPwd">Old password:</label>
					<input id={'oldPwd'} type="password" placeholder="enter old password" onChange={handleInputChange} />
					<label htmlFor="newPwd">New password:</label>
					<input id={'newPwd'} type="password" placeholder="enter new password" onChange={handleInputChange} />
					<label htmlFor="confirmNewPwd">Retry new password:</label>
					<input
						id={'confirmNewPwd'}
						type="password"
						placeholder="...and again (min 6 symbols)"
						onChange={handleInputChange}
					/>
					{errorText.length > 0 && (
						<div className={'password-change__errors'}>
							{errorText.map((item, index) => (
								<p key={'err-' + index}>{item}</p>
							))}
						</div>
					)}
					{errors?.length > 0 && (
						<div className={'password-change__errors'}>
							<p>{errors[0].value}</p>
						</div>
					)}
					<button
						className={'btn btn-primary btn-large security-data-popup__button' + (!formFilled ? ' disabled' : '')}
						onClick={formFilled ? handleSubmit : void 0}
					>
						Submit
					</button>
					<h1>{passwordExpired}</h1>
				</div>
			</div>
		</div>
	);
};
