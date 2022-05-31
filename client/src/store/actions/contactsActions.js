import * as R from 'ramda';
import contactServices from '../../services/contacts';

export const setContacts = () => async dispatch => {
  dispatch({
    type: '@/contacts/loading',
  });
  const { data } = await contactServices.getAllContacts();
  if (data.error) {
    dispatch({
      type: '@contacts/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@contacts/getAll',
      payload: data,
    });
  }
};
export const updateMode = payload => dispatch => {
  dispatch({
    type: '@/contacts/mode',
    payload,
  });
};
export const setCurrectContact = payload => dispatch => {
  dispatch({
    type: '@/contacts/current_contact',
    payload,
  });
};
export const setNewContact = contact_data => async dispatch => {
  dispatch({
    type: '@/contacts/loading',
  });
  const { data } = await contactServices.createContact(contact_data);
  if (data.error) {
    dispatch({
      type: '@contacts/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@contacts/newContact',
      payload: data,
    });
    return data;
  }
};
export const updateContact = payload => async dispatch => {
  dispatch({
    type: '@/contacts/loading',
  });
  const data = await contactServices.editAContact(
    payload._id,
    R.omit(['_id'], payload),
  );
  if (data.error) {
    dispatch({
      type: '@contacts/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@contacts/update',
      payload: data,
    });
    return data;
  }
};

export const deleteContact = payload => async dispatch => {
  dispatch({
    type: '@/contacts/loading',
  });
  const data = await contactServices.removeContact(payload);
  if (data.error) {
    dispatch({
      type: '@contacts/error',
      payload: data.message,
    });
    return null;
  } else {
    return data;
  }
};
