import React, { useRef,useEffect} from 'react'
import './header.css'
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from "reactstrap";
import { useSelector } from 'react-redux'
import useAuth from '../../custom.hooks/useAuth'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify';

import truck from '../../assets/images/truck.png'
import Cart from '../../assets/images/catr_icons.png'

const nav__links = [
  {
    path:'home',
    display: 'Home'
  },
  {
    path:'about',
    display: 'About'
  },
  {
    path:'category',
    display: 'Shop'
  },

];


const Header = () => {

  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const profileActionRef = useRef(null);

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const stickyHeaderFunc = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      } else{
        headerRef.current.classList.remove('sticky__header')
      }
    });
  };

  const logout = ()=>{

    signOut(auth).then(()=>{
      toast.success('Logged out')
      navigate('/home')
    }).catch(err=>{
        toast.error(err.message)
    })
  }

  useEffect(()=>{
      stickyHeaderFunc()
      return ()=> window.removeEventListener('scroll', stickyHeaderFunc);
  });

  const menuToggle =()=> menuRef.current.classList.toggle('active__menu')
  const navigateToCart =()=>{
      navigate('/cart');
  }
  const navigateToCat =()=>{
    navigate('/category');
}

  const toggleProfileActions = ()=> {
    console.log('Toggling profile actions');
    profileActionRef.current.classList.toggle('show__profileActions')
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />              
            </div>


              <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {
                    nav__links.map((item, index) => (
                      <li className="nav__item" key={index}>
                      <NavLink to={item.path} className={(navClass)=> navClass.isActive ? 'nav__active': ''}>{item.display}</NavLink>
                  </li>
                    ))
                  }
                </ul>
              </div>

              <div className="nav__icons">
                <motion.span whileTap={{scale:1.2}} className="fav__icon" onClick={navigateToCat}>
                  <img src={Cart} />
                 
                </motion.span>
                <motion.span whileTap={{ scale: 1.2 }} className="cart__icon" onClick={navigateToCart}>
                  <img src={truck} />
                  <span className="badge">{totalQuantity}</span>
                </motion.span>
                <div className="profile">
                  <motion.img 
                    whileTap={{ scale: 1.2 }} 
                    src={ currentUser ? currentUser.photoURL : userIcon} 
                    alt="" 
                    onClick={toggleProfileActions} 
                  />
                  
                  <div 
                    className="profile__actions" 
                    ref={profileActionRef} 
                    onClick={toggleProfileActions} 
                  > 
                    {currentUser ? (
                      <span onClick={logout}>Logout</span> 
                      
                    ) : (
                      <div className=' d-flex align-items-center justify-content-center flex-column'>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login'>Login</Link>
                        
                      </div>
                    )}
                  </div>
                </div>
                <div className="mobile__menu">
                  <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
              </div>
              </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header