import React, { useState } from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Card from '../../components/Card'

// img
import avatars1 from '../../assets/images/avatars/01.png'

import auth1 from './deliv.jpg'
import axios from 'axios'

const LockScreen = () => {
   let navigate =useNavigate()
   const [data,setData]=useState({
      password:''
   })
   const [error,setError] = useState('')
   const server='http://localhost:5000/users/Admin';
   const onAdmin=async(e)=>{
       e.preventDefault()
       if(data.password===''){
         setError("Please enter your password")
         return
       }
       try {
         const res=await axios.post(server,{...data});
         localStorage.setItem('admin', res.data.token);
         localStorage.setItem('user',res.data.user)
         navigate('/dashboard');
         
       } catch (e) {
         console.log("error",e.response.data.error);
         setError(e.response.data.error);
       }

   }
      return (
         <>
            <section className="login-content">
               <Row className="m-0 align-items-center bg-white vh-100">            
                  <Col md="6" className="p-0">   
                     <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                        <Card.Body>
                          
                           <Image src={avatars1} className="rounded avatar-80 mb-3" alt=""/>
                           <h2 className="mb-2">Hi ! Majed Smichi</h2>
                           <p>Enter your password to access the admin.</p>
                           <Form>
                              <Row>
                                 <Col lg="12">
                                    <Form.Group className="floating-label form-group">
                                       <Form.Label htmlFor="password" className="">Password</Form.Label>
                                       <Form.Control  type="password" className="" id="password" aria-describedby="password" placeholder=" " value={data.password} required
                                       onChange={(e)=>setData({...data,password:e.target.value})} onFocus={()=>setError('')}/>
                                    </Form.Group>
                                 </Col>
                              </Row>
                              {error && <p class="danger"style={{color: "red"}} >{error}</p>}
                              <Button onClick={onAdmin} type="button" variant="btn btn-primary">Login</Button>
                           </Form>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                     <Image src={auth1} className="img-fluid gradient-main animated-scaleX" alt="images"/>
                  </Col>
               </Row>
            </section>
         </>
   )
}

export default LockScreen
