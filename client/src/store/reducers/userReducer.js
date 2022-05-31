const initialState = {
  user: null,
  loading: false,
  currentToken: null,
  error_message: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@user/update':
      return {
        ...state,
        user: action.payload,
        currentToken: action.payload.token,
        loading: false,
      };
    case '@user/error':
      return {
        ...state,
        error_message: action.payload,
        loading: false,
      };
    case '@/user/loading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
