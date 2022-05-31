import { isEmpty, test, filter, not } from 'ramda';

export const validationsHandlerContact = (
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
