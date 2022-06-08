import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/SumSubstance';

export const kycStatus = () => axiosWrapper(`${apiPath}/getUserStatus`);
export const kycToken = () => axiosWrapper(`${apiPath}/getUserToken`);
//export const submitUserApplicantId = (id) => axiosWrapper(`${apiPath}/submitUserApplicantId?applicantId=${id}`);
//export const submitUserApplicationComplete = () => axiosWrapper(`${apiPath}/submitUserApplicationComplete`);