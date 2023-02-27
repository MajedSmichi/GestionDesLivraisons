import axios from 'axios'
import React,{useState} from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import Card from '../../components/Card'
import auth1 from './deliv.jpg'
import Header from '../header/Header'

const SignIn = () => {
   let history =useNavigate()
   const [data,setData]=useState({
      email:'',
      password:''
   })

   const [error,setError] = useState('')
   const server='http://localhost:5000/users/login';
   
   const onLogin=async(e)=>{
       e.preventDefault()
       if(data.email===''||data.password==='')
       {

         setError("Please enter your email and password!")
            return
       }
       try{
         const res=await axios.post(server,data)
         console.log("res", res)
         localStorage.setItem('user', res.data.token)
       }
       catch(e){
         console.log("error", e.response.data.error)
         setError(e.response.data.error)
       }
   }

   return (
      <div style={{backgroundColor:"white"}}><Header /> 
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white ">            
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>
                              <h2 className="mb-2 text-center">Sign In</h2>
                              <p className="text-center">Login to stay connected.</p>
                              <Form className='auth-form-validation'>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="email" className="" id="email" placeholder="email" value={data.email} required
                                           onChange={(e)=>setData({...data,email:e.target.value})}  onFocus={()=>setError('')}/>
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder="password" value={data.password} required
                                          onChange={(e)=>setData({...data,password:e.target.value})} onFocus={()=>setError('')}/>
                                       </Form.Group>
                                    </Col>
                                    {error && <p class="danger"style={{color: "red"}} >{error}</p>}
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Link to="/Recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button  onClick={onLogin} type="submit" variant="btn btn-primary">Sign In</Button>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Don’t have an account? <Link to="/SignUp" className="text-underline">Click here to sign up.</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>
                <Col md="6" className="col-sm-5 d-md-block d-none bg-primary p-0 mt-n1 vh-90 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main " alt="images"/>
               </Col> 
            </Row>
         </section>
        </div>
    )
}

export default SignIn
