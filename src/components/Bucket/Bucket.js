import { Component } from 'react'
import { Offcanvas, Button, Container, Row } from 'react-bootstrap'
import MainContent from '../MainContent/MainContent'


class Bucket extends Component {

    onShowed = (props, val) => {
        this.props.onShowed(props, val)
    }

    render() {
        const {itemBucket, onAddFavs, addToBucket, deleteFromBucket, showedBucket, clearElems, totalInBucket} = this.props

        const element = itemBucket.map(item => {
            return (
                <MainContent
                    addToBucket={() => addToBucket(item.id)}
                    deleteFromBucket={() => deleteFromBucket(item.id)}
                    onAddFavs={() => onAddFavs(item.id)}
                    key={item.id}
                    products={item}/>
            )
        })

        const orderButton = () => {
            if (totalInBucket > 0) {
                return (
                <Container>
                    <Row>
                        <Button onClick={() => this.onShowed('showedOrderModal', true)}>Оформить заказ</Button>
                    </Row>
                </Container>
                )
            }
        } 

        return (
        <>
        <Offcanvas show={showedBucket} placement="end" onHide={() => this.onShowed('showedBucket', false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина</Offcanvas.Title>
            </Offcanvas.Header>
            <Container className="d-flex align-items-center justify-content-between pb-2">
                <h5 className="m-0">Количество: 
                    <span className="text-primary"> {totalInBucket}</span>
                </h5>
                <Button onClick={() => clearElems('bucket', 0)}>Очистить корзину</Button>
            </Container>
            <Offcanvas.Body>
                {element}
                {orderButton()}
            </Offcanvas.Body>
            
        </Offcanvas>
        </>
        )
    }
}

export default Bucket;