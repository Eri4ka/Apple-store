import { Component } from 'react'
import {Modal, Button, Form, Row, Col, Spinner} from 'react-bootstrap'


class OrderModal extends Component {

    state = {
        validated: false,
        order: {
            email: '',
            phone: '',
            name: '',
            surname: '',
            city: '',
            street: '',
            house: '',
            room: '',
            delivery_type: 'Курьер',
            payment_type: 'Картой при получении',
            products: ''
        },
        isLoading: false,
        isSending: false
    }

    onShowed = (prop, val) => {
        this.props.onShowed(prop, val)
        setTimeout(() => {
            this.setState({
                validated: false,
                isSending: false 
            })
        }, 1000)
    }

    createOrder = (e) => {
        const input = e.target
        this.setState(({order}) => ({
            order: {
                email: input.getAttribute('id') === 'email' ? input.value : order.email,
                phone: input.getAttribute('id') === 'phone' ? input.value : order.phone,
                name: input.getAttribute('id') === 'name' ? input.value : order.name,
                surname: input.getAttribute('id') === 'surname' ? input.value : order.surname,
                city: input.getAttribute('id') === 'city' ? input.value : order.city,
                street: input.getAttribute('id') === 'street' ? input.value : order.street,
                house: input.getAttribute('id') === 'house' ? input.value : order.house,
                room: input.getAttribute('id') === 'room' ? input.value : order.room,
                delivery_type: input.getAttribute('id') === 'delivery_type' ? input.value : order.delivery_type,
                payment_type: input.getAttribute('id') === 'payment_type' ? input.value : order.payment_type,
                products: order.products
            }
        }))
    }

    deleteOrder = () => {
        this.setState({
            order: {
                email: '',
                phone: '',
                name: '',
                surname: '',
                city: '',
                street: '',
                house: '',
                room: '',
                delivery_type: 'Курьер',
                payment_type: 'Картой при получении'
            }
        })
        this.props.clearElems('bucket', 0)
    }

    addProductsToOrder = () => {
        this.setState(({order}) => ({
            order: {...order, products: this.props.itemBucket.map(item =>  ({ bucket: item.bucket, id: item.id, name: item.name, price: item.price}))}
        }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemBucket !== prevProps.itemBucket) {
            this.addProductsToOrder()
        }
    }

    validateForm = (e, bool) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            validated: bool
        })
    }

    sendForm = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            this.validateForm(e, true)
        } else {
            this.validateForm(e, false)
            this.setState({
                isLoading: true
            })
            this.addLagToCreateOrder()
                .then(() => {
                    this.setState({
                        isLoading: false,
                        isSending: true
                    })
                    this.props.createOrders(this.state.order);
                    this.deleteOrder();
                })
        }    
    }

    addLagToCreateOrder = () => {
        return new Promise((resolve) => setTimeout(resolve, 3000))
    }

    render() {

        const orderform = () => {
            if (this.state.isSending) {
                return (
                    <Modal.Title className="text-center text-primary">Заказ успешно создан!</Modal.Title>
                )
            } else {
                return (
                    <OrderForm
                        itemBucket={this.props.itemBucket}
                        totalInBucket={this.props.totalInBucket}
                        validated={this.state.validated}
                        isLoading={this.state.isLoading}
                        createOrder={this.createOrder}
                        sendForm={this.sendForm}
                        render={isLoading => (
                            <OrderButton isLoading={isLoading}/>
                        )}/>
                )
            }
        }

        return (
        <>
        <Modal show={this.props.showedOrderModal} onHide={this.state.isLoading ? null : () => this.onShowed('showedOrderModal', false)}>
            <Modal.Header closeButton>
                <Modal.Title>Оформление заказа</Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                {orderform()}
            </Modal.Body>
        </Modal>
        </>
        )
    }
}

class OrderForm extends Component {

    render() {

        return (
            <>
            <Row className="mb-3">
                    <Col>
                        <h5 className="m-0">Количество: 
                            <span className="text-primary"> {this.props.totalInBucket}</span>
                        </h5>
                    </Col>
                    <Col>
                        <h5 className="m-0">Сумма: 
                            <span className="text-primary"> {this.props.itemBucket.reduce((sum, product) => sum + product.price * product.bucket, 0)}</span>
                        </h5>
                    </Col>
                </Row>
                <Form noValidate validated={this.props.validated} onSubmit={this.props.sendForm}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                id="email"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                required
                                type="phone"
                                placeholder="+7999999999"
                                id="phone"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                required
                                placeholder="Иван"
                                id="name"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                required
                                placeholder="Иванов"
                                id="surname"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                required
                                placeholder="Москва"
                                id="city"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Улица</Form.Label>
                            <Form.Control
                                required
                                placeholder="Пушкина"
                                id="street"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Дом</Form.Label>
                            <Form.Control
                                required
                                id="house"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control
                                required
                                id="room"
                                onChange={this.props.createOrder}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label>Способ доставки</Form.Label>
                        <Form.Select
                            defaultValue="Курьер"
                            id="delivery_type"
                            onChange={this.props.createOrder}>
                                <option>Курьер</option>
                                <option>СДЭК</option>
                                <option>Boxberry</option>
                                <option>DPD</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Способ оплаты</Form.Label>
                        <Form.Select 
                            defaultValue="Картой при получении"
                            id="payment_type"
                            onChange={this.props.createOrder}>
                                <option>Картой при получении</option>
                                <option>Наличными при получении</option>
                        </Form.Select>
                    </Form.Group>
                    <Row className="mt-3">
                        <Col>
                            {/* <OrderButton isLoading={this.props.isLoading}/> */}
                            {this.props.render(this.props.isLoading)}
                        </Col>
                    </Row>
                </Form>
                </>
        )
    }
}

class OrderButton extends Component {
    render () {
        const spinner = this.props.isLoading ? <SpinnerButton/> : null

        return (
            <Button variant="primary" type="submit" disabled = {this.props.isLoading ? true : false}>
                {spinner}
                {this.props.isLoading ? 'Оформляем' : 'Оформить'}
            </Button>
        )
    }
}

const SpinnerButton = () => {

    return (
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className='me-2'
            />
    )
}

export default OrderModal;
