import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/fns';
import { Row, Col, Form, Button, Card, CardTitle } from 'reactstrap';
import { setRegisterUser } from '../../store/actions/usersActions';
import validations from '../../utils/validations';
import TextField from '../Common/TextField';
import ToastMessage from '../Common/ToastMessage';

const SignUpForm = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const error_message_user = useSelector(({ user }) => user.error_message);
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [areErrors, setAreErrors] = useState(true);
  const [errors, setErrors] = useState({
    name: { isError: false, message: '' },
    email: { isError: false, message: '' },
    password: { isError: false, message: '' },
  });

  const [status_error, setStatusError] = useState(false);
  useEffect(() => {
    if (getToken()) history('/');
  }, [history]);

  const errorHandler = () => {
    setErrors({
      name: { isError: false, message: '' },
      email: { isError: false, message: '' },
      password: { isError: false, message: '' },
    });
    validations.validationsHandlerSignUp(setAreErrors, setErrors, userInput);
  };

  const inputChangeHandler = evt => {
    setUserInput(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
    errorHandler();
  };

  const submitHandler = async evt => {
    evt.preventDefault();
    const userData = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    };
    try {
      const user = await dispatch(setRegisterUser(userData));
      if (!user) return setStatusError(true);
      setUserInput({ name: '', email: '', password: '' });
      history('/signin');
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
            Sign Up
          </CardTitle>
          <Form inline onSubmit={submitHandler}>
            <TextField
              label='Name'
              name='name'
              type='text'
              isError={errors.name.isError}
              value={userInput.name}
              message={errors.name.message}
              nameChangeHandler={inputChangeHandler}
              errorHandler={errorHandler}
            />
            <TextField
              label='Email'
              name='email'
              type='email'
              isError={errors.email.isError}
              value={userInput.email}
              message={errors.email.message}
              nameChangeHandler={inputChangeHandler}
              errorHandler={errorHandler}
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              isError={errors.password.isError}
              value={userInput.password}
              message={errors.password.message}
              nameChangeHandler={inputChangeHandler}
              errorHandler={errorHandler}
            />
            <Button block color='success' disabled={areErrors}>
              Sign Up
            </Button>
          </Form>
          <ToastMessage status={status_error} message={error_message_user} />
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpForm;
