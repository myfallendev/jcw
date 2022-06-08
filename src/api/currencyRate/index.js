import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/CurrencyRate';
export const currencyRatesForFiatCurrency = (currencyId) => axiosWrapper(`${apiPath}?toCurrencyId=${currencyId}`);
export const getFiatPairCurrencyRate = ({ fromCurrencyId, toCurrencyId }) =>
	axiosWrapper(`${apiPath}/getFiatPair`, { params: { fromCurrencyId, toCurrencyId } });
