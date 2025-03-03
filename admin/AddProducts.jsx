import React,{useState} from 'react'          
import { Container, Row, Col ,Form, FormGroup } from 'reactstrap'
import { toast } from 'react-toastify'
import { db,storage } from '../firebase.config'
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css';
const AddProducts = () => {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = async(e)=>{
    e.preventDefault()
    setLoading(true)

    //=========add product to the firebase database============
    try {
      
      const docRef = await collection(db,'products')

      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(()=>{
        toast.error('Images not uploaded!')
      }, ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            })
          })
        }
      );
      setLoading(false)
      toast.success("Product Successfully Added!");
      navigate('/dashboard/all-product')

    } catch (err) {
      setLoading(false)
      toast.error('Product not added!')
    }

  }
  return (
    <>
    <h1 className='dashboard'>Add Product</h1>
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {loading ? (
              <h4 className='py-5'>Loading.........</h4>
            ) : 
              <> 
               
                <Form onSubmit={addProduct}>
                  <FormGroup className='form__group'>
                    <span>Product title</span>
                    <input type="text" placeholder='Name of product' value={enterTitle} onChange={e=> setEnterTitle(e.target.value)} required/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Short Description</span>
                    <input type="text" placeholder='product brand,size' value={enterShortDesc} onChange={e=> setEnterShortDesc(e.target.value)} required/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Description</span>
                    <input type="text" placeholder='Description......' value={enterDescription} onChange={e=> setEnterDescription(e.target.value)} required/>
                  </FormGroup>
                  <div className='d-flex align-items-center justify-content-between gap-5'>
                    <FormGroup className='form__group w-50'>
                      <span>Price</span>
                      <input type="number" placeholder='100rs' value={enterPrice} onChange={e=> setEnterPrice(e.target.value)} required/>
                    </FormGroup>
                    <FormGroup className='form__group w-50'>
                      <span>Category</span>
                      <select className='w-100 p-2' value={enterCategory} onChange={e=> setEnterCategory(e.target.value)} required>
                          <option value="">Category</option>
                          <option value="concrete">Concrete</option>
                          <option value="wires">Wires</option>
                          <option value="timber">Timber</option>
                          <option value="steel">Steel</option>
                          <option value="connectors">Connectors</option>
                          <option value="circuit">Circuit Board</option>
                          <option value="gears">Gears</option>bearings
                          <option value="bearings">bearings</option>
                          <option value="fasteners">Fasteners</option>
                          <option value="adhesives">Adhesives</option>
                          <option value="solvents">Solvents</option>
                          <option value="lubricants">Lubricants</option>
                          <option value="pipes">Pipes</option>
                          <option value="valves">Valves</option>
                          <option value="equipment">Safety Equipment</option>
                          <option value="tools">Power Tools</option>
                          <option value="instruments">Measuring Instruments</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className='form__group'>
                      <span>Product Image</span>
                      <input type="file" onChange={e => setEnterProductImg(e.target.files[0])}/>
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type='submit'>Add Product</button>
                </Form></>
                }
            
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default AddProducts