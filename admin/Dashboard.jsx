import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/dashboard.css';
import useGetData from '../custom.hooks/useGetData';
import TopProducts from './TopProducts';
import TopUsers from './TopUsers';

const Dashboard = () => {
  const { data: products } = useGetData('products');
  const { data: users } = useGetData('users');
  const { data: orders } = useGetData('orders');
  const { data: sales } = useGetData('sales');

  return (
    <>
    <h1 className='dashboard'>Dashboard</h1>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box">
                <h5>Total Sales</h5>
                <span>{sales.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box">
                <h5>Orders</h5>
                <span>{orders.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="product__box">
                <h5>Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="users__box">
                <h5>Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>
            <TopProducts />
            </Col>
            <Col>
            <TopUsers />
            </Col>
          </Row>
           */}
          
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
