import React from 'react';
import {
  Row,
  Label,
  Input,
  FormGroup,
  Button,
  Col,
  FormFeedback,
} from 'reactstrap';

const AddressListInputs = props => {
  return (
    <FormGroup>
      <Label for='address_lines_contact'>Address Lines</Label>
      <Row>
        <Col sm={6}>
          <Button
            size='sm'
            className='padding-buttons'
            color='dark'
            type='button'
            onClick={() => props.addAddress('add')}>
            +
          </Button>
          <Button
            size='sm'
            className='padding-buttons'
            color='dark'
            type='button'
            disabled={props.address.length === 1}
            onClick={() => props.addAddress('substract')}>
            -
          </Button>
        </Col>
      </Row>
      {props.address.map((item, i) => {
        return (
          <Input
            key={i}
            defaultValue={item}
            name={`address-${i}`}
            invalid={props.isError}
            onChange={props.addressListHandler(i)}
            onBlur={() => props.errorHandler()}
          />
        );
      })}
    </FormGroup>
  );
};

export default AddressListInputs;
