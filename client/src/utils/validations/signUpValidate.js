import { isEmpty, test } from 'ramda';
export const validationsHandlerSignUp = (
  setAreErrors,
  setErrors,
  userInput,
) => {
  setAreErrors(false);
  if (isEmpty(userInput.name)) {
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Name is required' },
    }));
    setAreErrors(true);
  }
  if (userInput.name.length < 3) {
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Min 3 characteres' },
    }));
    setAreErrors(true);
  }

  if (userInput.name.length > 255) {
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Max 255 characteres' },
    }));
    setAreErrors(true);
  }
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
