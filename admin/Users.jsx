import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetData from '../custom.hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import '../styles/dashboard.css';

const Users = () => {
    const {data: usersData, loading} = useGetData('users')

    const deleteUser = async (id)=>{
        await deleteDoc(doc(db, 'users', id))
        toast.success('user deleted!')
    }

  return (
    <> <h1 className='dashboard'>Users</h1>
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <th>Image</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                          
                        </thead>

                        <tbody>
                            {loading ? (
                                <h5 className='pt-5 fw-bold'>Loading.....</h5>
                            ) : (
                                usersData?.map(user=>(
                                    <tr key={user.uid}>
                                        <td><img src={user.photoURL} alt="" /></td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td><button className='btn btn-danger' onClick={()=>{deleteUser(user.uid)}}>Delete</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Users