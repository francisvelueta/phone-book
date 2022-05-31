import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMode } from '../../store/actions/contactsActions';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Col,
  Row,
} from 'reactstrap';

const ContactList = props => {
  const contacts = useSelector(({ contacts }) => contacts.contacts);
  const dispatch = useDispatch();
  const sendContact = contact => {
    dispatch(updateMode('edit'));
    props.onContactToEdit(contact);
  };

  const toDelete = contact => {
    props.onDelete(contact);
  };

  return (
    <ListGroup>
      {contacts
        ? contacts.map(contact => (
            <ListGroupItem key={contact._id} action>
              <ListGroupItemHeading>
                {`Name: ${contact.name} ${contact.last_name}`} {}
              </ListGroupItemHeading>
              <Col sm={6}>
                <ListGroupItemText>
                  Phone:{contact.phone_number}
                </ListGroupItemText>
              </Col>
              <Row>
                <Col sm={1}>
                  <Button
                    size='sm'
                    className='padding-buttons'
                    color='dark'
                    type='button'
                    onClick={() => sendContact(contact)}>
                    edit
                  </Button>
                </Col>
                <Col sm={1}>
                  <Button
                    size='sm'
                    className='padding-buttons'
                    color='danger'
                    type='button'
                    onClick={() => toDelete(contact)}>
                    delete
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))
        : []}
    </ListGroup>
  );
};

export default ContactList;
