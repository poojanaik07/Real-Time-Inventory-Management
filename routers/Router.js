import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'
import Category from '../pages/Category'
import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'
import Concrete from '../components/ProIcons/Category/Concrete'
import Wires from '../components/ProIcons/Category/Wires'
import Steel from '../components/ProIcons/Category/Steel'
import Connectors from '../components/ProIcons/Category/Connector'
import Adhesive from '../components/ProIcons/Category/Adhesive'
import Timber from '../components/ProIcons/Category/Timber'
import Order from '../admin/Order'
import OrderSummary from '../pages/OrderSummary'
import Key from '../pages/Key'
import PasswordReset from '../pages/PasswordReset'
import Sales from '../admin/Sales'
import OrderNotification from '../pages/OrderNotification'
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='home' />} />
      <Route path="home" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="shop" element={<Shop/>}/>
      <Route path="shop/:id" element={<ProductDetails/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="ordersummary" element={<OrderSummary/>}/>
      
      <Route path="category" element={<Category/>}/>   
      <Route path='concrete' element={<Concrete/>}/>
      <Route path='steel' element={<Steel/>}/>
      <Route path='wires' element={<Wires/>}/>
      <Route path='connectors' element={<Connectors/>}/>
      <Route path='adhesive' element={<Adhesive/>}/>
      <Route path='timber' element={<Timber/>}/>

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout/>} />
        <Route path="ordernotification" element={<OrderNotification/>}/>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="key" element={<Key/>} />
        <Route path="dashboard/all-products" element={<AllProducts/>} />
        <Route path="dashboard/add-products" element={<AddProducts/>} />
        <Route path="dashboard/sales" element={<Sales/>} />
        <Route path="dashboard/users" element={<Users/>} />
        <Route path="dashboard/order" element={<Order/>} />
      </Route>

      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>  
      <Route path="password" element={<PasswordReset/>}/>                                                                               
    </Routes>
  );
};

export default Router