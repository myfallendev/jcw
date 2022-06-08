import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/UserSettings';

export const getEntries = () => axiosWrapper(`${apiPath}/getEntries`);
export const updateEntry = (id, value) => axiosWrapper(`${apiPath}/updateEntry?settingId=${id}&newValue=${value}`);
export const getNotificationSettings = () => axiosWrapper(`${apiPath}/getNotificationSettings`);
export const changeNotificationSettings = (userId, withdrawals, systemEvents) =>
	axiosWrapper(`${apiPath}/changeNotificationSettings`, {
		method: 'POST',
		data: { userId, withdrawals, systemEvents },
	});
