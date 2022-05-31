import * as R from 'ramda';
import userService from '../../services/users';

export const setRegisterUser = user => async dispatch => {
  dispatch({
    type: '@user/loading',
    payload: true,
  });
  const data = await userService.registerUser(user);
  if (data.error) {
    dispatch({
      type: '@user/error',
      payload: data.message,
    });
    return null;
  } else {
    return data;
  }
};

export const setLoginUser = credentials => async dispatch => {
  dispatch({
    type: '@user/loading',
    payload: true,
  });
  const data = await userService.login(credentials);
  if (data.error) {
    dispatch({
      type: '@user/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@user/update',
      payload: data,
    });
    return data;
  }
};
export const setLogout = () => dispatch => {
  dispatch({
    type: '@user/loading',
    payload: true,
  });
  userService.removeSession();
  dispatch({
    type: '@user/update',
    payload: { token: null },
  });
};

export const sendRequestPassword = email => async dispatch => {
  dispatch({
    type: '@user/loading',
    payload: true,
  });
  const data = await userService.requestUpdatePassword(email);
  if (data.error) {
    dispatch({
      type: '@user/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@user/loading',
      payload: false,
    });
    return data;
  }
};

export const updatePassword = payload => async dispatch => {
  dispatch({
    type: '@user/loading',
    payload: true,
  });
  const data = await userService.resetPassword(
    payload.token,
    R.omit(['token'], payload),
  );
  if (data.error) {
    dispatch({
      type: '@user/error',
      payload: data.message,
    });
    return null;
  } else {
    dispatch({
      type: '@user/loading',
      payload: false,
    });
    return data;
  }
};
