import React from 'react'
import { Container, Row} from 'reactstrap'
import useAuth from '../custom.hooks/useAuth'
import "../styles/admin-nav.css"
import { NavLink, useNavigate} from 'react-router-dom'
import logo from '../../src/assets/images/logo.png'
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const admin__nav = [
    {
        display:'Dashboard',
        path:'/dashboard'
    },
    {
        display:'Add-Products',
        path:'/dashboard/add-products'
    },
    {
        display:'All-Products',
        path:'/dashboard/all-products'
    },
    {
        display:'Users',
        path:'/dashboard/users'
    },
    {
        display:'Orders',
        path:'/dashboard/order'
    },
    {
        display:'Sales',
        path:'/dashboard/sales'
    },
    {
        display: 'Logout', 
        path: '/logout',
    }
]

const AdminNav = () => {

    const {currentUser} = useAuth()
    const navigate = useNavigate();

    

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out');
            navigate('/login'); // Redirect to the login page after logout
        } catch (error) {
            toast.error(error.message);
        }
    };
  return (
    <>
    <section className='admin__menu p-0'>
        <Container>
            <Row>
            <div className="logo">
              <img src={logo} alt="logo" />              
            </div>
                <div className="admin__navigation">
                    <ul className="admin__menu-list">
                        <div className='pro_img'>
                            <img src={currentUser && currentUser.photoURL} alt="" />
                            <p className='dis_name text-center'>{currentUser.displayName}</p>
                        </div>
                        {admin__nav.map((item, index) => (
                            <li className='admin__menu-item' key={index}>
                                {item.display === 'Logout' ? (
                                    <span className={`admin__menu-link ${navClass => navClass.isActive ? 'active__admin-menu' : ''}`} onClick={handleLogout}>Logout</span>
                                ) : (
                                    <NavLink to={item.path} className={`admin__menu-link ${navClass => navClass.isActive ? 'active__admin-menu' : ''}`}>{item.display}</NavLink>
                                    )}
                                </li>
                            ))}

                    </ul>
                </div>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default AdminNav