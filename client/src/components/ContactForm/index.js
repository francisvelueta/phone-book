import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import { isEmpty, not, filter, or } from 'ramda';
import {
  setNewContact,
  updateMode,
  updateContact,
} from '../../store/actions/contactsActions';
import validations from '../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Form } from 'reactstrap';
import TextField from '../Common/TextField';
import AddressListInputs from './AddressListInputs';
import OptionButtons from './OptionButtons';
import ToastMessage from '../Common/ToastMessage';

const ContactForm = () => {
  const history = useNavigate();
  const mode = useSelector(({ contacts }) => contacts.mode);
  const contactEdit = useSelector(({ contacts }) => contacts.current_contact);
  const [contactInput, setContactInput] = useState({
    enteredName: '',
    enteredLastName: '',
    enteredPhoneNumber: '',
    address_lines: [],
  });
  const [address, setAddress] = useState(['']);
  const [areErrors, setAreErrors] = useState(false);
  const [errors, setErrors] = useState({
    name: { isError: false, message: '' },
    last_name: { isError: false, message: '' },
    phone_number: { isError: false, message: '' },
    address: { isError: false, message: '' },
  });
  const [status_error, setStatusError] = useState(false);
  const error_message_api = useSelector(
    ({ contacts }) => contacts.error_message,
  );
  const dispatch = useDispatch();

  const resetFields = () => {
    setContactInput({
      name: '',
      last_name: '',
      phone_number: '',
      address_lines: [],
    });
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = ''),
    );
    setAddress(['']);
  };
  const errorHandler = () => {
    setErrors({
      name: { isError: false, message: '' },
      last_name: { isError: false, message: '' },
      phone_number: { isError: false, message: '' },
      address: { isError: false, message: '' },
    });
    validations.validationsHandlerContact(
      setAreErrors,
      setErrors,
      contactInput,
      address,
    );
  };
  useEffect(() => {
    if (mode === 'edit') {
      setContactInput({
        name: contactEdit.name,
        last_name: contactEdit.last_name,
        phone_number: contactEdit.phone_number,
      });
      setAddress([...contactEdit.address_lines]);
    } else {
      resetFields();
    }
  }, []);

  const addAddress = cnd => {
    errorHandler();
    if (cnd === 'add')
      return setAddress(prevState => {
        return [...prevState, ''];
      });
    setAddress(prevState => prevState.slice(0, -1));
  };

  const inputChangeHandler = evt => {
    setContactInput(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    errorHandler();
  };

  const backList = () => {
    dispatch(updateMode('new'));
    resetFields();
    history('/');
  };
  const addressListHandler = idx => evt => {
    setAddress(prevState => {
      const arrayCopy = [...prevState];
      arrayCopy[idx] = evt.target.value;
      return [...arrayCopy];
    });
    errorHandler();
  };

  const submitHandler = async evt => {
    evt.preventDefault();
    errorHandler();
    if (or(areErrors, isEmpty(filter(item => not(isEmpty(item)), address))))
      return false;
    setStatusError(false);
    const { name, last_name, phone_number } = contactInput;
    const contact = {
      name,
      last_name,
      phone_number,
      address_lines: address,
    };
    try {
      if (mode === 'new') {
        const newContact = await dispatch(setNewContact(contact));
        if (newContact) return resetFields();
      } else {
        await dispatch(updateContact({ ...contact, _id: contactEdit._id }));
        if (error_message_api) return setStatusError(true);
        resetFields();
        backList();
      }
    } catch (error) {
      setStatusError(true);
    }
  };

  return (
    <Row>
      <Form inline onSubmit={submitHandler} className='padding-button-y'>
        <TextField
          label='Name'
          name='name'
          isError={errors.name.isError}
          value={contactInput.name}
          message={errors.name.message}
          nameChangeHandler={inputChangeHandler}
          errorHandler={() => errorHandler()}
        />
        <TextField
          label='Last Name'
          name='last_name'
          isError={errors.last_name.isError}
          value={contactInput.last_name}
          message={errors.last_name.message}
          nameChangeHandler={inputChangeHandler}
          errorHandler={() => errorHandler()}
        />
        <TextField
          label='Phone Number'
          name='phone_number'
          isError={errors.phone_number.isError}
          value={contactInput.phone_number}
          message={errors.phone_number.message}
          nameChangeHandler={inputChangeHandler}
          errorHandler={() => errorHandler()}
        />
        <AddressListInputs
          address={address}
          addAddress={addAddress}
          isError={errors.address.isError}
          message={errors.address.message}
          addressListHandler={addressListHandler}
          errorHandler={errorHandler}
        />
        <OptionButtons areErrors={areErrors} mode={mode} backList={backList} />
      </Form>
      <ToastMessage status={status_error} message={error_message_api} />
    </Row>
  );
};

export default ContactForm;
