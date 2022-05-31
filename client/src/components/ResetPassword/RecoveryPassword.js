import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequestPassword } from '../../store/actions/usersActions';
import { Row, Col, Form, Button, Card, CardTitle } from 'reactstrap';
import validations from '../../utils/validations';
import ToastMessage from '../Common/ToastMessage';
import TextField from '../Common/TextField';

const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  const [areErrors, setAreErrors] = useState(true);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: { isError: false, message: '' },
  });

  const error_message_user = useSelector(({ user }) => user.error_message);
  const dispatch = useDispatch();
  const [status_error, setStatusError] = useState(false);

  const errorHandler = () => {
    setErrors({
      email: { isError: false, message: '' },
    });
    validations.validationsHandlerEmail(setAreErrors, setErrors, email);
  };

  const inputChangeHandler = evt => {
    setEmail(evt.target.value);
  };

  const submitHandler = async evt => {
    evt.preventDefault();
    setStatusError(false);
    try {
      const response = await dispatch(sendRequestPassword({ email }));
      if (!response) return setStatusError(true);
      setMessage('Email Send, Check yout email');
    } catch (error) {
      setStatusError(true);
    }
  };

  return (
    <Row>
      <Col
        sm={{
          offset: 4,
          order: 2,
          size: 4,
        }}>
        <Card body>
          <CardTitle tag='h5' className='text-center'>
            Recovery Password
          </CardTitle>
          <Form inline onSubmit={submitHandler}>
            <TextField
              label='Email'
              name='email'
              isError={errors.email.isError}
              value={email}
              message={errors.email.message}
              nameChangeHandler={inputChangeHandler}
              errorHandler={errorHandler}
            />
            <Button block color='success' type='submit' disabled={areErrors}>
              Send Validation Email
            </Button>
          </Form>
          {message && <h2>{message}</h2>}
          <ToastMessage status={status_error} message={error_message_user} />
        </Card>
      </Col>
    </Row>
  );
};

export default RecoveryPassword;
