import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../../src/styles/orders.css'
import '../styles/dashboard.css';
import { addDoc } from 'firebase/firestore';
import OrderDetailsModal from './OrderDetailsModal';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      // Fetch orders data and update state
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = [];
  
      ordersSnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
  
      // Sort orders by order date in descending order
      ordersData.sort((a, b) => b.orderDate.toMillis() - a.orderDate.toMillis());
  
      setOrders(ordersData);
    };
  
    fetchOrders();
  }, [orders]);
  

  const handleDeleteOrder = async (orderId) => {
    // Delete the order based on its ID
    await deleteDoc(doc(db, 'orders', orderId));
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

    // Close the order details when an order is deleted
    setSelectedOrder(null);
  };

  const handleDelivery = async (orderId) => {
   
    const orderToDeliver = orders.find((order) => order.id === orderId);
    await deleteDoc(doc(db, 'orders', orderId));
  
    const salesCollection = collection(db, 'sales');
    await addDoc(salesCollection, orderToDeliver);
  
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  
    setSelectedOrder(null);
  };

  const handleViewOrderDetails = (order) => {
    // Toggle the selected order
    setSelectedOrder((prevSelectedOrder) =>
      prevSelectedOrder && prevSelectedOrder.id === order.id ? null : order
    );
  };

  return (
    <>
     <h1 className='dashboard'>Orders</h1>
   
    <Container>
      {orders.map((order) => (
        <React.Fragment key={order.id}>
          <Row>
            <Col lg='12'>
              <h4>Order Details</h4>
              <table className='order-details-table'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User Info</th>
                    <th>Order Date</th>
                    <th>Total Qty</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <ul className='user-info-list'>
                        <li><strong>Name:</strong> {order.user.name}</li>
                        <li><strong>Email:</strong> {order.user.email}</li>
                        <li><strong>Phone:</strong> {order.user.phoneNumber}</li>
                        <li><strong>Address:</strong> {order.user.address}, {order.user.city}</li>
                        <li><strong>Payment Method:</strong> {order.user.payment}</li>
                      </ul>
                    </td>
                    <td>{order.orderDate.toDate().toLocaleString()}</td>
                    <td onClick={() => handleViewOrderDetails(order)}>
                      <u className='view-order-link'>{order.totalQty} items</u>
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <button
                        onClick={() => handleDelivery(order.id)}
                        className='btn btn-green'
                      >
                        Delivered
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className='btn btn-danger delete-button'
                      >
                        Delete
                      </button>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          {selectedOrder && selectedOrder.id === order.id && (
              <OrderDetailsModal
                isOpen={true} 
                toggle={() => setSelectedOrder(null)}
                order={selectedOrder}
              />
            )}
        </React.Fragment>
      ))}
    </Container>
    </>
  );
};

export default Order;
