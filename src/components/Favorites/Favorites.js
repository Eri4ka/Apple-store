import { Component } from 'react'
import { Offcanvas, Container, Button } from 'react-bootstrap'
import MainContent from '../MainContent/MainContent'


class Favorites extends Component {

    onShowed = () => {
        this.props.onShowed('showedFavs', false)
    }

    render() {
        const {itemFavs, onAddFavs, addToBucket, deleteFromBucket, showedFavs, clearElems} = this.props

        const element = itemFavs.map(item => {
            return (
                <MainContent
                    addToBucket={() => addToBucket(item.id)}
                    deleteFromBucket={() => deleteFromBucket(item.id)}
                    onAddFavs={() => onAddFavs(item.id)}
                    key={item.id}
                    products={item}/>
            )
        })

        return (
        <>
        <Offcanvas show={showedFavs} placement="end" onHide={this.onShowed}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Избранное</Offcanvas.Title>
            </Offcanvas.Header>
            <Container className="d-flex align-items-center justify-content-between">
                <h5 className="m-0">Количество: 
                    <span className="text-primary"> {itemFavs.length}</span>
                </h5>
                <Button onClick={() => clearElems('favorite', false)}>Очистить избранное</Button>
            </Container>
            <Offcanvas.Body>
                    {element}
            </Offcanvas.Body>
        </Offcanvas>
        </>
        )
    }
}

export default Favorites;