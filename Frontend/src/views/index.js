

import { Nav,Navbar,Container} from 'react-bootstrap'

import Logo from '../components/partials/components/logo'



//img
import delivery2 from '../assets/images/dashboard/delivery2.jpg'


//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'

const Index = (props) => {
   
    
    return (
            <div>
                <Container>
                    <Navbar bg="white" expand="lg" className="top-1 rounded">
                        <Container>
                            <Navbar.Brand href="#" className="mx-2 d-flex align-items-center">
                                <Logo color={true} />
                                <h5 className="logo-title mx-3">Hope UI</h5>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto mb-2 mb-lg-0 d-flex align-items-start">
                                    <Nav.Link href="https://templates.iqonic.design/hope-ui/documentation/react/build/" target="_blank" className="">
                                       Home
                                    </Nav.Link>
                                    <Nav.Link href="https://templates.iqonic.design/hope-ui/documentation/react/build/changelog" target="_blank" className="me-3">
                                        About
                                    </Nav.Link>
                                    <Nav.Link href="https://iqonic.design/product/admin-templates/hope-ui-free-open-source-react-admin-template/" className="btn btn-success text-white">
                                        Login
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </div>

    )
}

export default Index;
