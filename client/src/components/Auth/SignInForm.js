import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Card, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUser } from '../../store/actions/usersActions';
import { getToken } from '../../utils/fns';
import validations from '../../utils/validations';
import TextField from '../Common/TextField';
import ActionsLinks from './ActionsLinks';
import ToastMessage from '../Common/ToastMessage';

const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const [areErrors, setAreErrors] = useState(true);
  const [errors, setErrors] = useState({
    email: { isError: false, message: '' },
    password: { isError: false, message: '' },
  });
  const [status_error, setStatusError] = useState(false);
  const error_message_user = useSelector(({ user }) => user.error_message);

  useEffect(() => {
    if (getToken()) history('/');
  }, [history]);

  const errorHandler = () => {
    setErrors({
      email: { isError: false, message: '' },
      password: { isError: false, message: '' },
    });
    validations.validationsHandlerSignIn(setAreErrors, setErrors, userInput);
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
    setStatusError(false);
    const userData = {
      email: userInput.email,
      password: userInput.password,
    };
    try {
      const user = await dispatch(setLoginUser(userData));
      if (!user) return setStatusError(true);
      setUserInput({ email: '', password: '' });
      history('/');
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
            Sign In
          </CardTitle>
          <Form inline onSubmit={submitHandler}>
            <TextField
              label='Email'
              name='email'
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
            <Col sm={12} className='py-2'>
              <Button block color='danger' type='submit' disabled={areErrors}>
                Sign In
              </Button>
            </Col>
          </Form>
          <ActionsLinks />
          <ToastMessage status={status_error} message={error_message_user} />
        </Card>
      </Col>
    </Row>
  );
};

export default SignInForm;
