import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Button, Col, Spinner } from 'reactstrap';

const OptionButtons = props => {
  const loading = useSelector(({ contacts }) => contacts.loading);
  return (
    <Row>
      <Col sm={3}>
        <Button color='success' disabled={props.areErrors} type='submit'>
          {props.mode === 'edit' ? 'Update Contact' : 'Add New Contact'}
        </Button>
      </Col>
      {props.mode === 'edit' && (
        <Col sm={3}>
          <Button onClick={() => props.backList()}>Cancel</Button>
        </Col>
      )}
      {loading && (
        <Col sm={3}>
          <Spinner color='warning' type='grow'>
            Loading...
          </Spinner>
        </Col>
      )}
    </Row>
  );
};

export default OptionButtons;
