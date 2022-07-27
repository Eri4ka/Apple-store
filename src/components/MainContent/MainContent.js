import { Component } from 'react'
import {  Col, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './MainContent.css'

class MainContent extends Component {

    render() {
        const {name, img, price, favorite, bucket} = this.props.products

        const toggleBucket = () => {
            if (bucket > 0) {
                return (
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMinus} className="fa-lg ic" onClick={this.props.deleteFromBucket}/>
                    <output className="countCard ms-3 me-3 text-primary">{bucket}</output>
                    <FontAwesomeIcon icon={faPlus} className="fa-lg ic" onClick={this.props.addToBucket}/>
                </div>
                )
            } else {
                return <Button onClick={this.props.addToBucket}>В корзину</Button>
            }
        }

        return (
        <Col>
            <Card className="mb-2">
                <Card.Img variant="top" src={img} className="p-3"/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <div className="d-flex justify-content-between mt-3 align-items-center">
                        <Card.Text className="text-center text-primary" as="h3">{price + ' \u20bd'}</Card.Text>
                        <FontAwesomeIcon icon={favorite ? fasHeart: farHeart} className="fa-2x ic" onClick={this.props.onAddFavs}/>
                        {toggleBucket()}
                    </div>
                </Card.Body>
            </Card>
        </Col>
        )
    }
}

export default MainContent;