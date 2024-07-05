import React,{useState, useEffect} from 'react'
import CommonSection from "../../../components/UI/CommonSection"
import Helmet from "../../../components/Helmet/Helmet" 
import { Container,Row,Col } from 'reactstrap';
import ProductList from '../../../components/UI/ProductList'
import useGetData from '../../../custom.hooks/useGetData'


const Wires = () => {
  const {data: products, loading} = useGetData('products')
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    const filteredTrendingProducts = products.filter((item) => item.category === "wires");
    setTrendingProducts(filteredTrendingProducts);
  }, [products]);

    return (
      <Helmet title='Shop'>
        <CommonSection title='Products'/>
        <section>
          <Container>
            <Row>
            <ProductList data={trendingProducts}/>
            </Row>
          </Container>
        </section>
      </Helmet>
        )
}

export default Wires