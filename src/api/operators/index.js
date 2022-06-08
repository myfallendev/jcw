import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/Operator';

export const getOperators = () => axiosWrapper(`${apiPath}?page=1&itemsPerPage=100`);
