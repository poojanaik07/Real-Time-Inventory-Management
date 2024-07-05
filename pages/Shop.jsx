import React,  {useState, useEffect}  from 'react'
import { Container,Row,Col } from 'reactstrap'
import Product from '../assets/images/city2.jpg'
import city from '../assets/images/city.jpg'
import city1 from '../assets/images/city1.jpg'

import '../styles/extra.css'
import ProductList from '../components/UI/ProductList'
import useGetData from '../custom.hooks/useGetData';
import ActiveSlider from '../components/constant/ActiveSlider'
import MainActive from '../components/constant/MainActive'
import Newicon from './Newicon'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

const Shop = () => {

  const {data: products, loading} = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
 
  const year = new Date().getFullYear()

  useEffect(() => {
    const filteredTrendingProducts = products.filter((item) => item.category === "concrete");
    const filteredBestSalesProducts = products.filter((item) => item.category === "wires");
    const filteredMobileProducts = products.filter((item) => item.category === "steel");
    const filteredWirelessProducts = products.filter((item) => item.category === "timber");
    const filteredPopularProducts = products.filter((item) => item.category === "circuit");
    

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]); 

  return (
    <section>
        <Container>
            <Row className='bor_product'>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/concrete'><p className='desc_pro'>Concrete</p></Link></motion.div></Col>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/wires'><p className='desc_pro'>Wires</p></Link></motion.div></Col>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/steel'><p className='desc_pro'>Steel</p></Link></motion.div></Col>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/connectors'><p className='desc_pro'>Connectors</p></Link></motion.div></Col>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/adhesive'><p className='desc_pro'>Adhesive</p></Link></motion.div></Col>
                <Col lg='2'><motion.div whileTap={{scale:1.2}}><Link to='/timber'><p className='desc_pro'>Timber</p></Link></motion.div></Col>
            </Row>
            <MainActive/>        

            <Row className='deco_pro text-center'>
              <Col lg='4'><img src={city1} /></Col>
              <Col lg='4'><img src={city1} /></Col>
              <Col lg='4'><img src={city1} /></Col>
            </Row>
            <ActiveSlider />
        </Container>
        
    </section>
  )
}


export default Shop



