// Category.jsx

import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';

import ProductList from '../components/UI/ProductList';
import useGetData from '../custom.hooks/useGetData';

const Category = () => {
  const { data: products, loading } = useGetData('products');
  const [productsData, setProductsData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (value === 'all') {
      setProductsData(products);
    } else {
      const filteredProducts = products.filter((item) => item.category.toLowerCase() === value.toLowerCase());
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const searchedProducts = products.filter((item) => item.productName.toLowerCase().includes(term));
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className='filter__widget' onChange={handleFilter}>
                <select value={filterValue}>
                  <option value='all'>All Categories</option>
                  <option value='concrete'>Concrete</option>
                  <option value='wires'>Wires</option>
                  <option value='timber'>Timber</option>
                  <option value='steel'>Steel</option>
                  <option value='connectors'>Connectors</option>
                  <option value='circuit'>Circuit Board</option>
                  <option value='gears'>Gears</option>
                  <option value='bearings'>Bearings</option>
                  <option value='fasteners'>Fasteners</option>
                  <option value='adhesives'>Adhesives</option>
                  <option value='solvents'>Solvents</option>
                  <option value='lubricant'>Lubricant</option>
                  <option value='chair'>Pipes</option>
                  <option value='fittings'>Fittings</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className='search__box'>
                <input type='text' placeholder='Search.......' onChange={handleSearch} />
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className='text-center fs-4'>No products are found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Category;
