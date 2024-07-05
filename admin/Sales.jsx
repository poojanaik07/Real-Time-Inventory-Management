import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import OrderDetailsModal from './OrderDetailsModal';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      // Fetch sales data and update state
      const salesCollection = collection(db, 'sales');
      const salesSnapshot = await getDocs(salesCollection);
      const salesData = [];

      salesSnapshot.forEach((doc) => {
        salesData.push({ id: doc.id, ...doc.data() });
      });

      // Sort sales by order date in descending order
      salesData.sort((a, b) => b.orderDate.toMillis() - a.orderDate.toMillis());

      setSales(salesData);
    };

    fetchSales();
  }, []);

  const handleViewSaleDetails = (sale) => {
    // Toggle the selected sale
    setSelectedSale((prevSelectedSale) =>
      prevSelectedSale && prevSelectedSale.id === sale.id ? null : sale
    );
  };

  return (
    <>
      <h1 className='dashboard'>Sales</h1>

      <Container>
        {sales.map((sale) => (
          <React.Fragment key={sale.id}>
            <Row>
              <Col lg='12'>
                <h4>Sale Details</h4>
                <table className='order-details-table'>
                  <thead>
                    <tr>
                      <th>Sale ID</th>
                      <th>User Info</th>
                      <th>Order Date</th>
                      <th>Total Qty</th>
                      <th>Total Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={sale.id}>
                      <td>{sale.id}</td>
                      <td>
                        <ul className='user-info-list'>
                          <li><strong>Name:</strong> {sale.user.name}</li>
                          <li><strong>Email:</strong> {sale.user.email}</li>
                          <li><strong>Phone:</strong> {sale.user.phoneNumber}</li>
                          <li><strong>Address:</strong> {sale.user.address}, {sale.user.city}, {sale.user.country}</li>
                        </ul>
                      </td>
                      <td>{sale.orderDate.toDate().toLocaleString()}</td>
                      <td onClick={() => handleViewSaleDetails(sale)}>
                        <u className='view-order-link'>{sale.totalQty} items</u>
                      </td>
                      <td>₹{sale.totalAmount}</td>
                      <td>
                        {/* You can add additional actions/buttons if needed */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            {selectedSale && selectedSale.id === sale.id && (
              <OrderDetailsModal
                isOpen={true} 
                toggle={() => setSelectedSale(null)}
                order={selectedSale}
              />
            )}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
};

export default Sales;
