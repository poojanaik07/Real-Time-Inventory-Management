import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Key = () => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleKeySubmission = () => {
    if (key === 'pooja07') {
      // Redirect to the admin dashboard (replace with the actual admin dashboard route)
      navigate('/dashboard');
      toast.success('Admin login successful');
    } else {
      // Redirect back to the login pag (replace with the actual login route)
      navigate('/login');
      toast.error('You are not an admin');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='6' className="m-auto text-center">
            <h3 className="fw-bold mb-4">Admin Key</h3>

            <Form className="auth__form">
              <FormGroup className='form__group'>
                <input
                  type="password"
                  placeholder="Enter admin key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </FormGroup>

              <button
                type="button"
                className="buy__btn auth__btn"
                onClick={handleKeySubmission}
              >
                Submit
              </button>
              <p>
                Back to the <Link to='/login'>Login</Link> page.
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Key;
