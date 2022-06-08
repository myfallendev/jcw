import axiosWrapper from 'utils/axiosWrapper';
const api = '/api/TwoFactorAuthentication';

export const checkGoogleAuth = (phone) => axiosWrapper(`${api}/CheckGoogleAuth`, { params: { phone } });
export const requestGoogleAuth = (phone) => axiosWrapper(`${api}/RequestGoogleAuth`, { params: { phone } });
export const confirmGoogleAuth = (phone, checkCode) =>
	axiosWrapper(`${api}/ConfirmGoogleAuth`, { params: { phone, checkCode } });
export const resetGoogleAuth = (phone, checkCode) =>
	axiosWrapper(`${api}/ResetGoogleAuth`, { params: { phone, checkCode } });
