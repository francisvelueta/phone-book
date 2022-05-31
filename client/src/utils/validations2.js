import { isEmpty, test, not, filter } from 'ramda';

const validationsHandlerContact = (
  setAreErrors,
  setErrors,
  contactInput,
  address,
) => {
  setAreErrors(false);
  if (isEmpty(contactInput.name)) {
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Name is required' },
    }));
    setAreErrors(true);
  }
  if (contactInput.name.length < 3) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Min 3 characteres' },
    }));
  }
  if (contactInput.name.length > 255) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      name: { isError: true, message: 'Max 255 characteres' },
    }));
  }
  if (isEmpty(contactInput.last_name)) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      last_name: { isError: true, message: 'Last name is required' },
    }));
  }
  if (contactInput.last_name.length < 3) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      last_name: { isError: true, message: 'Min 3 characteres' },
    }));
  }
  if (contactInput.last_name.length > 255) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      last_name: { isError: true, message: 'Max 255 characteres' },
    }));
  }
  if (isEmpty(contactInput.phone_number)) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      phone_number: { isError: true, message: 'Last name is required' },
    }));
  }
  if (contactInput.phone_number.length < 10) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      phone_number: { isError: true, message: 'Min 10 numbers' },
    }));
  }

  if (contactInput.phone_number.length > 10) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      phone_number: { isError: true, message: 'Max 10 numbers' },
    }));
  }
  if (!test(/^\d+$/, contactInput.phone_number)) {
    setAreErrors(true);
    setErrors(prevState => ({
      ...prevState,
      phone_number: { isError: true, message: 'Only Numbers' },
    }));
    if (isEmpty(filter(item => not(isEmpty(item)), address))) {
      setErrors(prevState => ({
        ...prevState,
        address: { isError: true, message: 'Add 1 address' },
      }));
      setAreErrors(true);
    }
  }
};

const validationsHandlerSignIn = (setAreErrors, setErrors, userInput) => {
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

const validationsHandlerSignUp = (setAreErrors, setErrors, userInput) => {
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

const validationsHandlerEmail = (setAreErrors, setErrors, email) => {
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

const validationsHandlerPassword = (setAreErrors, setErrors, password) => {
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
export default {
  validationsHandlerContact,
  validationsHandlerSignIn,
  validationsHandlerSignUp,
  validationsHandlerEmail,
  validationsHandlerPassword,
};
