import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetLimitedData from '../custom.hooks/useGetLimitedData';
const TopUsers = () => {
  const { data: topUsers } = useGetLimitedData('users', { limit: 3 });
 
  return (
    <Col lg="12" className="mt-4">
      <h4>Top 5 New Users</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user) => (
            <tr key={user.uid}>
              <td><img src={user.photoURL} alt="" /></td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Col>
  );
};

export default TopUsers;
