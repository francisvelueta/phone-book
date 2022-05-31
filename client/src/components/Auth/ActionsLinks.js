import { useNavigate } from 'react-router-dom';
import { Row } from 'reactstrap';

const ActionsLinks = () => {
  const history = useNavigate();
  return (
    <Row>
      <span
        id='UncontrolledTooltipExample'
        style={{
          color: 'blue',
          textDecoration: 'underline',
          justifyItems: 'center',
          cursor: 'pointer',
        }}
        className='text-center pt-2'
        onClick={() => history('/signup')}>
        Sign Up
      </span>
      <span
        id='UncontrolledTooltipExample'
        style={{
          color: 'blue',
          textDecoration: 'underline',
          justifyItems: 'center',
          cursor: 'pointer',
        }}
        className='text-center pt-3'
        onClick={() => history('/recovery')}>
        Recovery Password
      </span>
    </Row>
  );
};

export default ActionsLinks;
