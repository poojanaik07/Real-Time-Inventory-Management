// OrderDetailsModal.js
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const OrderDetailsModal = ({ isOpen, toggle, order }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Order Details</ModalHeader>
      <ModalBody>
        <h4>Order Products</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td><img src={item.imgUrl} alt="" /></td>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity} pcs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderDetailsModal;
