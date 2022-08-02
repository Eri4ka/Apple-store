import { Navbar, Container, Col, Row } from 'react-bootstrap'
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

class NavBar extends Component {

    onShowed = (prop, val) => {
        this.props.onShowed(prop, val)
    }

    render() {

        return (
        <Row>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Col sm={1}>
                    <Navbar.Brand href="#home">
                        <FontAwesomeIcon icon={faApple} style={{color: 'White'}} className="fa-2x"/>
                    </Navbar.Brand>
                </Col>
                <Col sm={1} className="d-flex">
                    <div className="position-relative me-4">
                        <FontAwesomeIcon icon={faHeart} style={{color: 'White'}} className="fa-2x ic" onClick={() => this.onShowed('showedFavs', true)}/>
                        <div className="favwrapper bg-primary text-white">{this.props.itemFavs}</div>
                    </div>
                    <div className="position-relative">
                        <FontAwesomeIcon icon={faBasketShopping} style={{color: 'White'}} className="fa-2x ic" onClick={() => this.onShowed('showedBucket', true)}/>
                        <div className="favwrapper bg-primary text-white">{this.props.totalInBucket}</div>
                    </div>
                </Col>
            </Container>
        </Navbar>
        </Row>
        )
    }
}

export default NavBar;