import { isEmpty, test } from 'ramda';

export const validationsHandlerEmail = (setAreErrors, setErrors, email) => {
  setAreErrors(false);
  if (isEmpty(email)) {
    setErrors(prevState => ({
      ...prevState,
      email: { isError: true, message: 'Email is required' },
    }));
    setAreErrors(true);
  }
  if (
    !test(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      email,
    )
  ) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      email: { isError: true, message: 'Invalid Email' },
    }));
  }
};

export const validationsHandlerPassword = (
  setAreErrors,
  setErrors,
  password,
) => {
  setAreErrors(false);
  if (isEmpty(password)) {
    setErrors(prevState => ({
      ...prevState,
      password: { isError: true, message: 'Password is required' },
    }));
    setAreErrors(true);
  }
  if (password.length < 8) {
    setErrors(prevState => ({
      ...prevState,
      password: { isError: true, message: 'Min 8 characteres' },
    }));
    setAreErrors(true);
  }
};
