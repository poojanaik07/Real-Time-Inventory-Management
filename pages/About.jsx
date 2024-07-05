import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container,Row,Col } from 'reactstrap'
import about1 from '../assets/images/about1.jpg';
import about2 from '../assets/images/about2.jpg';
import about3 from '../assets/images/about3.jpg';
import about4 from '../assets/images/about4.jpeg';
import about10 from '../assets/images/about10.webp';
import about7 from '../assets/images/about7.png'
import Image1 from '../assets/images/hero-img.png'
import Image2 from '../assets/images/image2.png'
import about8 from '../assets/images/about8.jpg'
import '../styles/about.css'
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';

const About = () => {

  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index)
  }

  const cardVariants = {
    expanded: {
      width: "400px"
    },
    collapsed: {
      width: '200px'
    }
  }

  const cardImages = [ about3,about10, about4, about1, about2]

  const cardhead =[
    'Time-saving convenience',
    'Widerange option',
    'Streamlined ordering',
    'Reliable delivery',
    'Competitive pricing',
  ]

  const cardDescriptions = [
    'With our platform, you can order all your engineering and construction materials in just a few clicks, saving you valuable time and effort.',
    'We offer a diverse selection of high-quality materials, giving you the flexibility to choose the perfect fit for your projects.',
    'Our user-friendly interface makes it easy for you to navigate, search for specific products, and complete your purchase smoothly.',
    'We ensure prompt and reliable delivery of your materials, right to your doorstep, so you can stay focused on your project without any interruptions.',
    'We strive to offer competitive prices on all our products, helping you stay within budget while still getting the quality you need.',
  ]
  return (
    <Helmet title='About'>
      <CommonSection title='About' />
   <section className='about_bg py-16 pb-[300px] bg-gradient-to-r from-purple-800 to-indigo-800'>
    <Container>
      
      <Row>
        <Col lg='8'>
          <h4>Welcome to our world of construction and engineering materials! We're here to simplify your building projects by providing a hassle-free way to order top-quality materials. With our user-friendly platform, you can browse through a wide range of products and place your order with ease. Say goodbye to the time-consuming process of visiting multiple stores – we've got everything you need right here. Let's build together!" 🏗️💪🌐</h4>
        </Col>
        <Col className='image_one text-end' lg='4'>
          <img src={Image1} />
        </Col>
      </Row>
      <Row>
        <Col className='image_one' lg='4'>
        <img src={Image2} />
        </Col>
        <Col className='text-end' lg='8'>
          <h4>"Our mission is to revolutionize the way builders and engineers access and procure construction materials. We strive to provide a seamless and efficient online platform that simplifies the ordering process, saving our customers valuable time and effort. By offering a wide range of top-quality products, competitive pricing, and reliable delivery, we aim to be the go-to destination for all their material needs. We're passionate about supporting sustainable practices and empowering our customers to create exceptional projects while minimizing environmental impact. Together, let's build a better future!" 🌱🏗️💪</h4>
        </Col>
      </Row>
      
      
    </Container>
      <div className='card max-w-7xl mx-auto px-2  text-center'>    
          <h1 className='text-3xl font-extrabold text-white'>Benifits of InnoBuild</h1>
          <p className='mt-2 text-xl text-gray-300'>Check out here</p>
      </div>
      <div className='card_box text-center'>
        {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
            key={index}
            className={`card-b cursor-pointer h-[500px] bg-cover bg-center rounded-[20px] ${index === expandedIndex ? 'expanded': ''}`}
            variants={cardVariants}
            initial=                                                                "collapsed"
            animate={index === expandedIndex ? 'expanded': 'collapsed'}
            transition={{duration: 0.5}}
            onClick={() => handleCardClick(index)}
            style={{
                    backgroundImage: `url(${cardImages[index]})`,
            }}
          >
           
              <div className='card_desc'>
                  <div>
                    <h3 className='text-xl font-semibold text-white text-center'>{cardhead[index]}</h3>
                    {index === expandedIndex && (
                      <p className='mt-2 text-grey text-center'>{cardDescriptions[index]} </p>
                    )

                    }
                  </div>
              </div>           
          </motion.div>
        ))}
      </div>
      <Container>
      <Row className='image_all'>
        <Col lg='8' md='8'>
          <div className='image_desc'>
          <h4 className='image_txt text-center md-5'>Welcome to our world of construction and engineering materials! We're here to simplify your building projects by providing a hassle-free way to order top-quality materials. With our user-friendly platform, you can browse through a wide range of products and place your order with ease. Say goodbye to the time-consuming process of visiting multiple stores – we've got everything you need right here. Let's build together!" 🏗️💪🌐</h4>
          </div>
        </Col>
        <Col className='image_one text-end' lg='4'>
          <img src={about8} />
        </Col>
      </Row>
      </Container>
   </section>
   </Helmet>
  )
}
export default About;
