import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetLimitedData from '../custom.hooks/useGetLimitedData';

const TopProducts = () => {
  const { data: topProducts } = useGetLimitedData('products', 3);

  return (
    <Col lg="12" className="mt-4">
      <h4>Top 5 New Products</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.imgUrl} alt="" /></td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Col>
  );
};

export default TopProducts;
