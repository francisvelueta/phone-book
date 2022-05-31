import { isEmpty, test } from 'ramda';
export const validationsHandlerSignIn = (
  setAreErrors,
  setErrors,
  userInput,
) => {
  setAreErrors(false);
  if (isEmpty(userInput.email)) {
    setErrors(prevState => ({
      ...prevState,
      email: { isError: true, message: 'Email is required' },
    }));
    setAreErrors(true);
  }
  if (
    !test(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      userInput.email,
    )
  ) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      email: { isError: true, message: 'Invalid Email' },
    }));
  }
  if (isEmpty(userInput.password)) {
    setErrors(prevState => ({
      ...prevState,
      password: { isError: true, message: 'Password is required' },
    }));
    setAreErrors(true);
  }
  if (userInput.password.length < 8) {
    setErrors(prevState => ({
      ...prevState,
      password: { isError: true, message: 'Min 8 characteres' },
    }));
    setAreErrors(true);
  }
};
