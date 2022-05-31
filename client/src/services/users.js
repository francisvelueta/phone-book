import axios from 'axios';
import { errorMessage } from './../utils/error-manager';
const setToken = token => window.localStorage.setItem('loggedUserBook', token);
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});
const login = async credentials => {
  try {
    const { data } = await api.post('api/users/login', credentials);
    setToken(data.data.token);
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};
const registerUser = async user_data => {
  try {
    const { data } = await api.post('api/users/register', user_data);
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};

const requestUpdatePassword = async email => {
  try {
    const { data } = await api.post('api/users/requestReset', email);
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};

const resetPassword = async (token, payload) => {
  try {
    const { data } = await api.put(
      `/api/users/resetPassword/${token}`,
      payload,
    );
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};

const removeSession = () => {
  window.localStorage.removeItem('loggedUserBook');
};

export default {
  login,
  setToken,
  registerUser,
  removeSession,
  requestUpdatePassword,
  resetPassword,
};
