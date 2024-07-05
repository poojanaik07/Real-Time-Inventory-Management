// OrderNotification.js

import React from 'react';

const OrderNotification = ({ orderData }) => {
  // Check if orderData is defined
  if (!orderData) {
    return <div>No order data available.</div>;
  }

  return (
    <div>
      <h2>Your Order Notification</h2>
      {/* Display order data here */}
      {/* For example: */}
      <p>Order ID: {orderData.orderId || 'N/A'}</p>
      <p>Total Cost: {orderData.totalAmount || 'N/A'}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default OrderNotification;
