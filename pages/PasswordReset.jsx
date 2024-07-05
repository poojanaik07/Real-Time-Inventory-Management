import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordReset = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // TODO: Send OTP to the provided mobile number via SMS or other method.

    // For now, simulate sending OTP by setting isOtpSent to true.
    setIsOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // TODO: Verify the OTP entered by the user.

    // For now, simulate successful verification.
    toast.success('OTP verification successful');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Helmet title='Reset Password'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className="m-auto text-center">
              <h3 className="fw-bold mb-4">Reset Password</h3>

              {isOtpSent ? (
                <Form className="auth__form" onSubmit={handleVerifyOtp}>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">Verify OTP</button>
                  <p>
                    Back to{" "}
                    <Link to='/login'>Login</Link>
                  </p>
                </Form>
              ) : (
                <Form className="auth__form" onSubmit={handleSendOtp}>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder="Enter your mobile number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">Send OTP</button>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default PasswordReset;
