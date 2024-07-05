import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap'; // Assuming you have imported Table from 'reactstrap'
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import Tickmark from '../../src/assets/images/tickmark.png'
import '../../src/styles/ordersum.css';

const OrderSummary = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = [];

      ordersSnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });

      ordersData.sort((a, b) => b.orderDate.toMillis() - a.orderDate.toMillis());

      setLatestOrder(ordersData[0]);
    };

    fetchLatestOrder();
  }, []);

  return (
    <Container className='ordersummary text-center'>
      <img src={Tickmark} className='order_icons' alt="" />
      <h1>Order Placed Successfully</h1>
      {latestOrder && (
        <Row>
          <Col lg='12'>
            <Table bordered responsive>
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <td>{latestOrder.id}</td>
                </tr>
                <tr>
                  <th>Placed</th>
                  <td>{latestOrder.orderDate.toDate().toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Total Cost</th>
                  <td>{latestOrder.totalAmount}</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>

            <Table bordered responsive>
              <tbody>
                <tr>
                  <th>Shipping Address</th>
                  <td>{latestOrder.user.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{latestOrder.user.email}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{latestOrder.user.phoneNumber}</td>
                </tr>
                <tr>
                  <th>Total Cost</th>
                  <td>{latestOrder.totalAmount}</td>
                </tr>
                <tr>
                  <th>Total Qty</th>
                  <td>{latestOrder.totalQty} items</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderSummary;
