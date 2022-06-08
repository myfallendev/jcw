import axiosWrapper from 'utils/axiosWrapper';
const api = '/api/FiatWithdraw';

export const getFiatOrders = (page, itemsPerPage) =>
	axiosWrapper(`${api}`, {
		params: {
			page,
			itemsPerPage,
		},
	});
