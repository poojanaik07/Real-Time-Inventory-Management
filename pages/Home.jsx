import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainActive from '../components/constant/MainActive'
import { Container, Row,Col } from 'reactstrap';
import "../styles/home.css";
import Services from '../services/Services';
import ProductList from '../components/UI/ProductList';
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock';
import Down from '../assets/images/down.png'
import useGetData from '../custom.hooks/useGetData';
import ActiveSlider from '../components/constant/ActiveSlider';

const Home = () => {

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
  <Helmet title={"Home"}>
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg='12' md='6'>
            <div className="hero__content text-center">
              <p>Welcome to our world of </p>
              <h1 className="text-center">InnoBuild!!</h1>
              <p className="text-center fw-bold"> Here to simplify your building projects by providing a hassle-free way to order top-quality materials.</p>

              <motion.button whileTap={{scale:1.2}} className="buy__btn"><Link to='/category'>SHOP NOW</Link></motion.button>
            </div>
            </Col>
        </Row>
      </Container>
      <div className='hero_img'>
              <img src={Down} alt="" />
            </div>
    </section>

    <Services />
    <MainActive/>        
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">Trending Products</h2>
          </Col>

          {loading ? (
            <h5 className='fw-bold'>Loading......</h5>
          ) : (
            <ProductList data={trendingProducts}/>
          )}
          
        </Row>
      </Container>
    </section>
    <ActiveSlider />
    <section className="best__sales">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">Best Sales</h2>
          </Col>

          {loading ? (
            <h5 className='fw-bold'>Loading......</h5>
          ) : (
            <ProductList data={bestSalesProducts}/>
          )}
          
          
        </Row>
      </Container>
    </section>

    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="clock__top-content">
              <h4 className="text-white">Limited Offers</h4>
              <h3 className="text-white">Quality Armchair</h3>
            </div>
            <Clock />
            <motion.button whileTap={{scale:1.2}} className="buy__btn  store__btn"><Link to="/category">Visit Store</Link></motion.button>
          </Col>
          <Col lg='6' md='6' className="text-end">
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>

    <section className="new__arrivals">
      <Container>
        <Row>
        <Col lg="12" className="text-center">
            <h2 className="section__title">New Arrivals</h2>
          </Col>
          {loading ? (
            <h5 className='fw-bold'>Loading......</h5>
          ) : (
            <ProductList data={mobileProducts}/>
          )}

          {loading ? (
            <h5 className='fw-bold'>Loading......</h5>
          ) : (
            <ProductList data={wirelessProducts}/>
          )}
        </Row>
      </Container>
    </section>

    <section className="popular__category">
      <Container>
        <Row>
        <Col lg="12" className="text-center">
            <h2 className="section__title">Popular Category</h2>
          </Col>
          {loading ? (
            <h5 className='fw-bold'>Loading......</h5>
          ) : (
            <ProductList data={popularProducts}/>
          )}
          
        </Row>
      </Container>
    </section>


  </Helmet>
  );
};

export default Home;