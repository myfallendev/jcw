import axiosWrapper from 'utils/axiosWrapper';
const APIPATH = '/api/CurrencyCode';

export const getCurrencyCodes = () => axiosWrapper(`${APIPATH}?page=1&itemsPerPage=1000`);
export const getCurrencyCode = (id) => axiosWrapper(`${APIPATH}/${id}`);
