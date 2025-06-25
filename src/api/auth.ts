import axios from './axios';

export const loginApi = (data: { email: string; password: string }) => {
  return axios.post('/auth/login', data);
};

export const registerApi = (data: { email: string; password: string }) => {
  return axios.post('/auth/register', data);
};