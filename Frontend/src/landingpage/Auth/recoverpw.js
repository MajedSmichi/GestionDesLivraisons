import React, { useState } from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import Card from '../../components/Card'
import Header from '../header/Header'
import axios from 'axios'



// img
import auth1 from './deliv.jpg'
const Recoverpw = () => {
   const {id} = useParams()
   console.log({id})
   let navigate =useNavigate();
   const [successMessage, setSuccessMessage] = useState('');
   const [error, setError] = useState('')
   const [data,setData]=useState({
      email:''
   })
   const server='http://localhost:5000/users/recover';
   const onRecover=async(e)=>{
      e.preventDefault()
      if(data.email==='')
      {

        setError("Please enter your email")
           return
      }
      try{
        const res=await axios.post(server,{...data, role:id})
        
       
        setSuccessMessage('Check your mailbox');
        setTimeout(()=>{
           navigate(`/SignIn/${id}`); 
        },2000)
     
      }
      catch(e){
        console.log("error", e.response.data.error)
        setError(e.response.data.error)
      }
  }
   return (
      <div  style={{backgroundColor:"white"}}>
      <Header /> 
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white  ">
               <Col md="6" className="col-sm-4 d-md-block d-none bg-primary p-0 mt-n1 vh-90 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main " alt="images"/>
               </Col>
               <Col md="6" className="p-0">               
                  <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                     <Card.Body>
                
                        <h2 className="mb-2">Reset Password</h2>
                        {successMessage && <div className="alert alert-success text-center" role="alert">{successMessage}</div>}
                        <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                        <Form>
                           <Row>
                              <Col lg="12" className="col-lg-12">
                                 <Form.Group  className="floating-label">
                                    <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
                                    <Form.Control type="email" className="form-control" id="email" aria-describedby="email" placeholder=" " value={data.email} required
                                           onChange={(e)=>setData({...data,email:e.target.value})}  onFocus={()=>setError('')}/>
                                 </Form.Group>
                              </Col>
                              {error && <p style={{color: "red"}} >{error}</p>}
                           </Row>
                           <Button onClick={onRecover}  className="mt-3" type="button" variant="primary">Reset</Button>
                        </Form>
                     </Card.Body>
                  </Card>               
                
               </Col>
            </Row>
         </section>
      </div>
   )
}

export default Recoverpw
