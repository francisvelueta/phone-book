import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const ModalMessage = props => {
  return (
    <Modal centered fullscreen='sm' size='' isOpen={props.status}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>{props.message}</ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={() => props.delete()}>
          Agree
        </Button>
        <Button onClick={() => props.cancel()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalMessage;
