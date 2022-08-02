import { Component } from 'react'
import { Navbar, Container, Row, Col, Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faVk } from '@fortawesome/free-brands-svg-icons'


class Footer extends Component {

    render() {
        return (
        
            <Row>
                <Navbar bg="dark">
                <Container className="align-items-start">
                    <Col sm={3} xl={2} className="d-flex flex-column">
                        <Navbar.Text className="fs-6 text-white ">Всегда на связи</Navbar.Text>
                        <Navbar.Text className="fs-7 text-muted">{'\u24b8 Apple Inc., 2022'}</Navbar.Text>
                    </Col>
                    <Col sm={3} xl={2} className="d-flex flex-column">
                        <Navbar.Text className="fs-6 text-nowrap text-white">Мы в социальных сетях</Navbar.Text>
                        <Row>
                            <Col>
                                <Nav>
                                    <Nav.Link href="#">
                                        <FontAwesomeIcon icon={faInstagram} style={{color: 'White'}} className="fa-lg"/>
                                    </Nav.Link>
                                </Nav>
                            </Col>
                            <Col>
                                <Nav>
                                    <Nav.Link href="#">
                                        <FontAwesomeIcon icon={faTwitter} style={{color: 'White'}} className="fa-lg"/>
                                    </Nav.Link>
                                </Nav>
                            </Col>
                            <Col>
                                <Nav>
                                    <Nav.Link href="#">
                                        <FontAwesomeIcon icon={faVk} style={{color: 'White'}} className="fa-lg"/>
                                    </Nav.Link>
                                </Nav>
                            </Col>
                        </Row>
                    </Col>
                </Container>
                </Navbar>
            </Row>
        
        )
    }
}

export default Footer;