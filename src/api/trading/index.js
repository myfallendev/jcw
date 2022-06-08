import axiosWrapper from 'utils/axiosWrapper';
const api = '/api/Trading';

export const getTradingPairs = (tradingPair = '') => axiosWrapper(`${api}/info`, { params: { tradingPair } });
export const getTickerInfo = (tradingPair = '', startPoint = '', interval = `24:00:00`) =>
	axiosWrapper(`${api}/ticker`, { params: { tradingPair, startPoint, interval } });
export const sendOrder = ({ currencyFrom, currencyTo, amount, price, isSellOrder }) =>
	axiosWrapper(`${api}/trade`, {
		method: 'POST',
		data: JSON.stringify({ currencyFrom, currencyTo, amount, price, isSellOrder }),
	});
export const removeOrder = ({ id, currencyFrom, currencyTo }) =>
	axiosWrapper(`${api}/removeOrder`, { method: 'POST', data: JSON.stringify({ id, currencyFrom, currencyTo }) });
export const getActiveOrders = (tradingPair = '') => axiosWrapper(`${api}/activeOrders`, { params: { tradingPair } });
export const getMarketOrders = (tradingPair = '') => axiosWrapper(`${api}/marketOrders`, { params: { tradingPair } });
export const getTradingHistory = (tradingPair, page, itemsPerPage) =>
	axiosWrapper(`${api}/completedOrders`, { params: { tradingPair, page, itemsPerPage } });
