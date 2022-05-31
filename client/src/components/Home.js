import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setContacts,
  setCurrectContact,
  deleteContact,
} from '../store/actions/contactsActions';
import { setLogout } from '../store/actions/usersActions';
import { getToken } from './../utils/fns';
import { Container, Row, Col, Card, CardTitle, Button } from 'reactstrap';
import ContactForm from './ContactForm';
import ContactList from './Contacts/ContactList';
import ModalMessage from './Common/ModalMessage';
import ToastMessage from './Common/ToastMessage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [status_error, setStatusError] = useState(false);
  const error_message_contact = useSelector(
    ({ contacts }) => contacts.error_message,
  );
  const [modal_data, setModalData] = useState({
    modal_status: false,
    info: '',
    user_to_delete: null,
  });

  useEffect(() => {
    if (getToken()) {
      dispatch(setContacts());
    } else {
      history('/signin');
    }
  }, [dispatch, history]);

  const sendContactInfo = contact => {
    dispatch(setCurrectContact(contact));
    history(`/contacts/${contact._id}`);
  };
  const setDelete = contact => {
    setModalData({
      modal_status: true,
      info: `User: ${contact.name} ${contact.last_name} with ID: ${contact._id}`,
      user_to_delete: contact._id,
    });
  };

  const deleteHandler = async () => {
    try {
      const deletedContact = await dispatch(
        deleteContact(modal_data.user_to_delete),
      );
      if (!deletedContact) return setStatusError(true);
      await dispatch(setContacts());
      setModalData({
        modal_status: false,
        info: '',
        user_to_delete: null,
      });
    } catch (e) {
      setStatusError(true);
    }
  };

  const logOut = () => {
    dispatch(setLogout());
    history('/signin');
  };
  return (
    <Container>
      <Row>
        <Col
          sm={{
            offset: 1,
            order: 2,
            size: 10,
          }}>
          <Card body>
            <CardTitle tag='h5' className='text-center'>
              Contacts
            </CardTitle>
            <Col
              md={{ offset: 10, size: 2 }}
              className='d-flex justify-content-end'>
              <Button color='success' onClick={() => logOut()}>
                Sign Out
              </Button>
            </Col>
            <ContactForm />
            <ContactList
              onContactToEdit={sendContactInfo}
              onDelete={setDelete}
            />
          </Card>
          <ModalMessage
            status={modal_data.modal_status}
            title={'Remove Contact from BD'}
            message={modal_data.info}
            cancel={() =>
              setModalData(prevStatus => ({
                ...prevStatus,
                modal_status: false,
              }))
            }
            delete={deleteHandler}
          />
          <ToastMessage status={status_error} message={error_message_contact} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
