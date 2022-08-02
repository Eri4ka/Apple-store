import { Component } from 'react'
import { Container } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar';
import MainTabs from '../MainTabs/MainTabs';
import Favorites from '../Favorites/Favorites';
import Bucket from '../Bucket/Bucket';
import OrderModal from '../OrderModal/OrderModal'
import Footer from '../Footer/Footer';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [
                { id: 1, name: 'Apple iPhone 11 64GB Black', img: 'https://images.biggeek.ru/1/435/a296/9913-898bigeek_image4.jpeg', price: 44990, storage: '64GB', favorite: false, bucket: 0, group_id: 1},
                { id: 2, name: 'Apple iPhone 11 128GB Black', img: 'https://images.biggeek.ru/1/435/a296/9913-898bigeek_image4.jpeg', price: 53990, storage: '128GB', favorite: false, bucket: 0, group_id: 1},
                { id: 3, name: 'Apple iPhone 11 64GB RED', img: 'https://images.biggeek.ru/1/435/bb3d/9917-406bigeek_image7.jpeg', price: 53990, storage: '64GB', favorite: false, bucket: 0, group_id: 1},
                { id: 4, name: 'Apple iPhone 11 256GB White', img: 'https://images.biggeek.ru/1/435/683e/9924-498bigeek_image8.jpeg', price: 62990, storage: '256GB', favorite: false, bucket: 0, group_id: 1},
                { id: 5, name: 'Apple iPhone 12 64GB Black', img: 'https://images.biggeek.ru/1/435/4441/12427-883photo_2020-10-21%2015.13.09.jpeg', price: 46990, storage: '64GB', favorite: false, bucket: 0, group_id: 2},
                { id: 6, name: 'Apple iPhone 12 128GB White', img: 'https://images.biggeek.ru/1/435/95d7/12433-738photo_2020-10-21%2015.13.04.jpeg', price: 59990, storage: '128GB', favorite: false, bucket: 0, group_id: 2},
                { id: 7, name: 'Apple iPhone 12 256GB Purple', img: 'https://images.biggeek.ru/1/435/fdd2/13829-96112_lilac.jpg', price: 67990, storage: '256GB', favorite: false, bucket: 0, group_id: 2},
                { id: 8, name: 'Apple iPhone 13 128GB Blue', img: 'https://images.biggeek.ru/1/435/657a/14693-756Blue.jpg', price: 67990, storage: '128GB', favorite: false, bucket: 0, group_id: 3},
                { id: 9, name: 'Apple iPhone 13 256GB Pink', img: 'https://images.biggeek.ru/1/435/11bf/14697-47Pink.jpg', price: 78990, storage: '256GB', favorite: false, bucket: 0, group_id: 3},
                { id: 10, name: 'Apple iPhone 13 256GB Midnight', img: 'https://images.biggeek.ru/1/435/e940/14699-439Midnight.jpg', price: 67990, storage: '256GB', favorite: false, bucket: 0, group_id: 3},
                { id: 11, name: 'Apple iPhone 13 512GB Blue', img: 'https://images.biggeek.ru/1/435/90a0/14703-621Blue.jpg', price: 90990, storage: '512GB', favorite: false, bucket: 0, group_id: 3},
                { id: 12, name: 'Apple iPhone 13 512GB Green', img: 'https://images.biggeek.ru/1/435/7544/16270-42713_green.jpg', price: 87990, storage: '512GB', favorite: false, bucket: 0, group_id: 3}
            ],
            groups : [
                { id: 1, name: 'iPhone 11'},
                { id: 2, name: 'iPhone 12'},
                { id: 3, name: 'iPhone 13'}
            ],
            showedFavs: false,
            showedBucket: false,
            showedOrderModal: false,
            orders: []
        }
    }

    onShowed = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    onAddFavs = (id) => {
        this.setState(({products}) => ({
            products: products.map(item => {
                if (id === item.id) {
                    return {...item, favorite: !item.favorite}
                }
                return item
            }) 
        }))
    }

    addToBucket = (id) => {
        this.setState(({products}) => ({
            products: products.map(item => {
                if (id === item.id) {
                    return {...item, bucket: item.bucket + 1}
                }
                return item
            }) 
        }))
    }

    deleteFromBucket = (id) => {
        this.setState(({products}) => ({
            products: products.map(item => {
                if (id === item.id) {
                    return {...item, bucket: item.bucket - 1}
                }
                return item
            }) 
        }))
    }

    clearElems = (prop, value) => {
        this.setState(({products}) => ({
            products: products.map(item => {
                return {...item, [prop]: value}
            })
        }))
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'increase':
                return items.filter(item => item.price > 50000)
            case 'decrease':
                return items.filter(item => item.rise)
            default:
                return items
        }
    }

    createOrders = (order) => {
        this.setState(({orders}) => ({
            orders: [...orders, order]
        }))
    }

    render() {

        const {products, groups, showedFavs, showedBucket, showedOrderModal} = this.state

        const itemFavs = products.filter(item => {
                if (item.favorite) {
                    return item
                }
                return null
            })

        const itemBucket = products.filter(item => {
            if (item.bucket) {
                return item
            }
            return null
        })

        const totalInBucket = products.reduce((sum, product) => sum + product.bucket, 0)

        return (
        <Container fluid>
            <NavBar onShowed={this.onShowed} itemFavs={itemFavs.length} totalInBucket={totalInBucket}/>
            <MainTabs
            
                products={products}
                groups={groups}
                onAddFavs={this.onAddFavs}
                addToBucket={this.addToBucket}
                deleteFromBucket={this.deleteFromBucket}/>
            <Footer/>
            <Favorites 
                onShowed={this.onShowed} 
                showedFavs={showedFavs} 
                itemFavs={itemFavs} 
                onAddFavs={this.onAddFavs}
                addToBucket={this.addToBucket}
                deleteFromBucket={this.deleteFromBucket}
                clearElems={this.clearElems}/>
            <Bucket 
                onShowed={this.onShowed} 
                showedBucket={showedBucket} 
                itemBucket={itemBucket} 
                onAddFavs={this.onAddFavs}
                addToBucket={this.addToBucket}
                deleteFromBucket={this.deleteFromBucket}
                clearElems={this.clearElems}
                totalInBucket={totalInBucket}/>
            <OrderModal
                onShowed={this.onShowed}
                showedOrderModal={showedOrderModal}
                createOrders={this.createOrders}
                itemBucket={itemBucket}
                clearElems={this.clearElems}
                totalInBucket={totalInBucket}/>
        </Container>
        )
    }
}

export default App;