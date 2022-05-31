import * as R from 'ramda';

const initialState = {
  contacts: [],
  loading: false,
  error_message: null,
  mode: 'new',
  current_contact: null,
  contact: null,
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@contacts/getAll':
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case '@contacts/newContact':
      return {
        ...state,
        contacts: R.sort(R.ascend(R.prop('name')), [
          ...state.contacts,
          action.payload,
        ]),
        loading: false,
      };

    case '@contacts/error':
      return {
        ...state,
        error_message: action.payload,
        loading: false,
      };
    case '@/contacts/loading':
      return {
        ...state,
        loading: true,
      };

    case '@/contacts/mode':
      return {
        ...state,
        mode: action.payload,
      };
    case '@/contacts/current_contact':
      return {
        ...state,
        current_contact: action.payload,
      };
    case '@/contacts/update':
      return {
        ...state,
        error_message: null,
        loading: false,
      };
    default:
      return state;
  }
};
