import React from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import Card from '../../components/Card'



// img
import auth1 from     './deliv.jpg'
const Recoverpw = () => {
   let history =useNavigate()
   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white  ">
               <Col md="6" className="col-sm-4 d-md-block d-none bg-primary p-0 mt-n1 vh-90 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main " alt="images"/>
               </Col>
               <Col md="6" className="p-0">               
                  <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                     <Card.Body>
                
                        <h2 className="mb-2">Reset Password</h2>
                        <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                        <Form>
                           <Row>
                              <Col lg="12" className="col-lg-12">
                                 <Form.Group  className="floating-label">
                                    <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
                                    <Form.Control type="email" className="form-control" id="email" aria-describedby="email" placeholder=" "/>
                                 </Form.Group>
                              </Col>
                           </Row>
                           <Button onClick={() => history.push('/auth/sign-in')} className="mt-3" type="button" variant="primary">Reset</Button>
                        </Form>
                     </Card.Body>
                  </Card>               
                
               </Col>
            </Row>
         </section>
      </>
   )
}

export default Recoverpw
