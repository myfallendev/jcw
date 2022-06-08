import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/Heartbeat';

export const heartbeat = () => axiosWrapper(apiPath, { method: 'POST' });
