import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/fns';
import ContactForm from '../ContactForm';

const Home = () => {
  const history = useNavigate();
  useEffect(() => {
    if (!getToken()) return history('/signin');
  }, [history]);
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
              Edit Contact
            </CardTitle>
            <ContactForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
