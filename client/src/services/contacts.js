import axios from 'axios';
import { getToken } from '../utils/fns';
import { errorMessage } from '../utils/error-manager';
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});

const getAllContacts = async () => {
  const { data } = await api.get('api/contacts/', {
    headers: { auth: getToken() },
  });
  return data;
};

const createContact = async contactInfo => {
  try {
    const { data } = await api.post('api/contacts/', contactInfo, {
      headers: { auth: getToken() },
    });
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};
const editAContact = async (id, payload) => {
  try {
    const { data } = await api.put(`api/contacts/${id}`, payload, {
      headers: { auth: getToken() },
    });
    return data;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};

const removeContact = async id => {
  try {
    const code = await api.delete(`api/contacts/${id}`, {
      headers: { auth: getToken() },
    });
    return code;
  } catch (e) {
    return { error: true, message: errorMessage(e) };
  }
};
export default { getAllContacts, createContact, editAContact, removeContact };
