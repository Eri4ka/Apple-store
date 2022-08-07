import {Component} from 'react';
import {Toast, ToastContainer} from 'react-bootstrap';

class Alert extends Component {

    onFavAlert = () => {
        this.props.onFavAlert(false)
    }

    render() {
        return (
            <ToastContainer className="p-3" position='top-start'>
                <Toast show={this.props.favAlert} onClose={this.onFavAlert} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Избранное</strong>
                        <small>Сейчас</small>
                    </Toast.Header>
                    <Toast.Body>Добавлено в избранное!</Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }
}

export default Alert;