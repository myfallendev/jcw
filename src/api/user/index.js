import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/User';

export const getUserInfo = () =>
	axiosWrapper(`${apiPath}/getInfo`, {
		method: 'POST',
		credentials: 'same-origin',
	});

export const isJCAccount = (accountAddress, phoneNumber) => {
	const req = phoneNumber ? `phoneNumber=${phoneNumber}` : accountAddress ? `cryptoAddress=${accountAddress}` : null;
	return axiosWrapper(`${apiPath}/checkExists?${req}`);
};

export const login = (username, password) => {
	return axiosWrapper(`${apiPath}/login`, {
		method: 'POST',
		data: JSON.stringify({
			Login: username,
			Password: password,
			//'Recaptcha': window.__GCaptcha.key
			Recaptcha: 'SomeText',
		}),
	});
};

export const logout = () =>
	axiosWrapper(`${apiPath}/logout`, {
		method: 'POST',
	});

export const register = (login, phone, referralLinkId) =>
	axiosWrapper(`${apiPath}/register`, {
		method: 'POST',
		data: JSON.stringify({ login, phone, referralLinkId }),
	});

export const setEmail = (email) =>
	axiosWrapper(`${apiPath}/setEmail`, { method: 'POST', data: JSON.stringify({ email }) });

export const getCfIp = () =>
	axiosWrapper(`${apiPath}/getCfIp`, {
		method: 'POST',
		headers: {
			Accept: 'text/plain;',
			'Content-Type': 'text/plain',
		},
		responseType: 'text',
	});

export const checkEmailVerificationCode = (code) =>
	axiosWrapper(`${apiPath}/verifyEmail?token=${code}`, {
		method: 'POST',
		data: JSON.stringify({
			token: code,
		}),
	});

export const requestNewEmailVerificationCode = (userEmail) => {
	const email = encodeURIComponent(userEmail);
	return axiosWrapper(`${apiPath}/requestEmailVerification?email=${userEmail}`, {
		method: 'POST',
		data: JSON.stringify({ email }),
	});
};

export const restorePassword = (id) => {
	const login = id.indexOf('@') !== -1 ? encodeURIComponent(id) : id;
	return axiosWrapper(`${apiPath}/resetPassword?login=${login}`, {
		method: 'POST',
	});
};

export const restorePasswordConfirm = (login, code, password, passwordConfirm) => {
	return axiosWrapper(`${apiPath}/resetPasswordCommit`, {
		method: 'POST',
		data: JSON.stringify({
			login,
			code,
			password,
			passwordConfirm,
		}),
	});
};

export const changePassword = (oldPassword, password, passwordConfirm) => {
	return axiosWrapper(`${apiPath}/changePassword`, {
		method: 'POST',
		data: JSON.stringify({ oldPassword, password, passwordConfirm }),
	});
};

export const uploadAvatar = (data) =>
	axiosWrapper(`${apiPath}/changeImage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: data,
	});

export const changeData = (data) =>
	axiosWrapper(`${apiPath}/changeData`, { method: 'POST', data: JSON.stringify(data) });

export const changePin = ({ newPin, verificationCode, verificationType }) =>
	axiosWrapper(`${apiPath}/changePin`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json;',
			'Content-Type': 'application/json-patch+json',
			verificationCode: verificationCode ?? '',
			verificationType: verificationType ?? '',
		},
		params: { newPin: newPin ?? '' },
	});
