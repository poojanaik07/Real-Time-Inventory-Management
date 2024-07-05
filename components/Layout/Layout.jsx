import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Router';
import AdminNav from '../../admin/AdminNav';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Layout = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <>
 
      {isDashboardPage ? <AdminNav /> : <Header />}
      <div style={{ marginLeft: isDashboardPage ? '250px' : '0' }}>
        <div>
          <Routers />
        </div>
        {!isDashboardPage && <Footer />}
      </div>
    </>
  );
};

export default Layout;
