import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
// Assuming you have Firebase Firestore configured and imported
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../styles/checkout.css'
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
 
  const navigate = useNavigate(); 

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    payment: 'cash', // Default payment method
    upiDetails: '', // UPI payment details
    bankDetails: '', // Bank details
  });

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const paymentMethod = e.target.value;
    setUserInfo({
      ...userInfo,
      payment: paymentMethod,
    });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/; // Matches a 10-digit number
    return phonePattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const dispatch = useDispatch();

  const placeOrder = async () => {
    const isValidPhoneNumber = validatePhoneNumber(userInfo.phoneNumber);
    const isValidEmail = validateEmail(userInfo.email);

    if (!isValidPhoneNumber) {
      setPhoneError('Invalid phone number. Please enter a 10-digit number.');
      return;
    } else {
      setPhoneError('');
    }

    if (!isValidEmail) {
      setEmailError('Invalid email address. Please enter a valid email.');
      return;
    } else {
      setEmailError('');
    }

    try {
      const orderData = {
        user: userInfo,
        items: cartItems,
        totalQty,
        totalAmount,
        orderDate: new Date(),
        payment: userInfo.payment, // Add payment method information
        upiDetails: userInfo.upiDetails,
        bankDetails: userInfo.bankDetails,
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      toast.success('Order placed successfully');

      // Pass cart items and total amount to OrderSummary page
      navigate("/ordersummary", { state: { cartItems, totalAmount } });
      dispatch(cartActions.clearCart());

      // You can add any additional actions here, such as clearing the cart.

    } catch (error) {
      console.error('Error placing order: ', error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <h3 className='mb-4 fw-bold'>Billing Information</h3>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                  required
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='Enter your email'
                  name='email'
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                />
                {emailError && <span className="text-danger">{emailError}</span>}
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type='number'
                  placeholder='Enter your Phone Number'
                  name='phoneNumber'
                  value={userInfo.phoneNumber}
                  onChange={handleUserInfoChange}
                />
                {phoneError && <span className="text-danger">{phoneError}</span>}
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='House no./Building Name'
                  name='address'
                  value={userInfo.address}
                  onChange={handleUserInfoChange}
                />
                </FormGroup>
                <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='Road Name/Area/Colony'
                  name='city'
                  value={userInfo.city}
                  onChange={handleUserInfoChange}
                />
              </FormGroup>
            </Form>

            {/* Payment Method Section */}
            <h6 className='mb-4 fw-bold'>Payment Method</h6>
            <FormGroup className='form__group'>
              <select
                name='payment'
                value={userInfo.payment}
                onChange={handlePaymentChange}
                className='payment_met'
              >
                <option value='cash'>Cash on Delivery</option>
                <option value='upi'>UPI Payment</option>
                <option value='bank'>Bank Transfer</option>
              </select>
            </FormGroup>
            
            {userInfo.payment === 'upi' && (
              <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='Enter UPI details'
                  name='upiDetails'
                  value={userInfo.upiDetails}
                  onChange={handleUserInfoChange}
                />
              </FormGroup>
            )}

            {userInfo.payment === 'bank' && (
              <FormGroup className='form__group'>
                <input
                  type='text'
                  placeholder='Enter Bank details'
                  name='bankDetails'
                  value={userInfo.bankDetails}
                  onChange={handleUserInfoChange}
                />
              </FormGroup>
            )}

            {/* Display Cart Items */}
            <h6 className='mb-4 fw-bold'>Cart Items</h6>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imgUrl} alt='' />
                    </td>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}px</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col lg='4'>
            <div className='checkout__cart'>
              <h6>Total Qty: <span>{totalQty} items</span></h6>
              <h6>Subtotal: <span>₹{totalAmount}</span></h6>
              {/* Add shipping information here */}
              <h4>Total Cost: <span>₹{totalAmount}</span></h4>
              <button
                className='buy__btn auth__btn w-100'
                onClick={placeOrder}
              >
                Place an order
              </button>
              
            </div>
            <button className="buy__btn w-100 mt-4"><Link to='/category'>Continue Shopping</Link></button>
          </Col>
        </Row>
      </Container>
      
    </section>
  );
};

export default Checkout;