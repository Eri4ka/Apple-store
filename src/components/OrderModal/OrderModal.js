import { Component } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'


class OrderModal extends Component {

    state = {
        validated: false
    }

    sendForm = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation()
        }
        
        this.setState({
            validated: true
        })
    };

    onShowed = (prop, val) => {
        this.props.onShowed(prop, val)
    }

    render() {
        return (
        <>
        <Modal show={this.props.showedOrderModal} onHide={() => this.onShowed('showedOrderModal', false)}>
            <Modal.Header closeButton>
                <Modal.Title>Оформление заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={this.state.validated} onSubmit={this.sendForm}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="+7999999999"
                                autoFocus
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                placeholder="Иван"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                placeholder="Иванов"
                                autoFocus
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                placeholder="Москва"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Улица</Form.Label>
                            <Form.Control
                                placeholder="Пушкина"
                                autoFocus
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Дом</Form.Label>
                            <Form.Control
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control
                                autoFocus
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Способ доставки</Form.Label>
                        <Form.Select defaultValue="Курьер">
                            <option>Курьер</option>
                            <option>СДЭК</option>
                            <option>Boxberry</option>
                            <option>DPD</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Способ оплаты</Form.Label>
                        <Form.Select defaultValue="Картой при получении">
                            <option>Картой при получении</option>
                            <option>Наличными при получении</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => this.onShowed('showedOrderModal', false)}>
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        )
    }
}

export default OrderModal;
