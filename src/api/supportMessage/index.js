import axiosWrapper from 'utils/axiosWrapper';
const api = '/api/SupportMessage';

export const sendQuestion = (name, text) => axiosWrapper(`${api}`, { method: 'POST', data: JSON.stringify({ name, text })});