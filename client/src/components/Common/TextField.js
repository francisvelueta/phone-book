import { prop } from 'ramda';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';

const TextField = props => {
  return (
    <FormGroup>
      <Label for={props.name}>{props.label}</Label>
      <Input
        name={props.name}
        invalid={props.isError}
        value={props.value}
        type={props.type ? props.type : 'text'}
        onChange={props.nameChangeHandler}
        onBlur={() => props.errorHandler()}
      />

      {props.isError && <FormFeedback>{props.message}</FormFeedback>}
    </FormGroup>
  );
};

export default TextField;
