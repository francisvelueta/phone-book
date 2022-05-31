import React, { useState } from 'react';
import { split, last, o } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Button, Card, CardTitle } from 'reactstrap';
import { updatePassword } from '../../store/actions/usersActions';
import validations from '../../utils/validations';
import ToastMessage from '../Common/ToastMessage';
import TextField from '../Common/TextField';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [areErrors, setAreErrors] = useState(true);
  const [errors, setErrors] = useState({
    password: { isError: false, message: '' },
  });
  const location = useLocation();
  const error_message_user = useSelector(({ user }) => user.error_message);
  const dispatch = useDispatch();
  const [status_error, setStatusError] = useState(false);
  const [message, setMessage] = useState('');

  const errorHandler = () => {
    setErrors({
      password: { isError: false, message: '' },
    });
    validations.validationsHandlerPassword(setAreErrors, setErrors, password);
  };

  const inputChangeHandler = evt => {
    setPassword(evt.target.value);
  };

  const submitHandler = async evt => {
    evt.preventDefault();
    try {
      const passwordEdited = await dispatch(
        updatePassword({
          token: o(last, split('/'))(location.pathname),
          password,
        }),
      );
      if (!passwordEdited) return setStatusError(true);
      setMessage('Password updated successfully');
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
            Reset Password
          </CardTitle>
          <Form inline onSubmit={submitHandler}>
            <TextField
              label='New Password'
              name='password'
              type='password'
              isError={errors.password.isError}
              value={password}
              message={errors.password.message}
              nameChangeHandler={inputChangeHandler}
              errorHandler={errorHandler}
            />
            <Button block color='success' type='submit' disabled={areErrors}>
              Reset Password
            </Button>
          </Form>
          {message && <h2>{message}</h2>}
          <ToastMessage status={status_error} message={error_message_user} />
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
