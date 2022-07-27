import { Component, Fragment } from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import MainContent from '../MainContent/MainContent';
import MainSort from '../MainSort/MainSort';

class MainTabs extends Component {

    state = {
        activeTab: 1,
        sort: 'all'
    }

    changeActiveTab = (id) => {
        this.setState({
            activeTab: id
        })
    }

    onSort = (sort) => {
        this.setState({
            sort: sort
        })
    }

    sortProducts = (items, sort) => {
        switch (sort) {
            case 'increase':
                return items.sort((a, b) => a.price > b.price ? 1 : -1)
            case 'decrease':
                return items.sort((a, b) => a.price < b.price ? 1 : -1)
            default:
                return items
        }
    }

    render() {

        const {groups, products, onAddFavs, addToBucket, deleteFromBucket} = this.props
        const {activeTab, sort} = this.state

        const tab = groups.map(item => {
            return (
            <Fragment key={item.id}>
                <Nav.Item> 
                    <Nav.Link eventKey={item.id} href="#" onClick={() => this.changeActiveTab(item.id)}>
                        {item.name}
                    </Nav.Link>
                </Nav.Item>
            </Fragment>
            )
        })

        const getProducts = (id) => {
            const product = this.sortProducts(products, sort).map(item => {
                if (item.group_id === id) {
                    return (
                    <MainContent
                        onAddFavs={() => onAddFavs(item.id)}
                        addToBucket={() => addToBucket(item.id)}
                        deleteFromBucket={() => deleteFromBucket(item.id)}
                        key={item.id}
                        products={item}/>
                    )
                }
                return null
            })
            return product
        }

        const content = groups.map(item => {
            return (
            <Fragment key={item.id}>
                <Tab.Pane eventKey={item.id}>
                    <Row xs={1} sm={2} xxl={3} className="g-3">
                        {getProducts(item.id)}
                    </Row>
                </Tab.Pane>
            </Fragment>
            )
        })

        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey='1'>
            <Row className="mt-3 min-vh-100">
              <Col md={2} >
                <Nav variant="pills" className="flex-column">
                    {tab}
                </Nav>
              </Col>
              <Col md={10}  className="mt-3 mt-md-0">
                <Row>
                    <Col xl={10}>
                        <Tab.Content>
                            {content}
                        </Tab.Content>
                    </Col>
                    <Col xs={{ order: 'first' }} xl={{ span: 2, order: 'last' }}>
                        <MainSort
                            sort={sort}
                            products={products}
                            activeTab={activeTab}
                            onSort={this.onSort}/>
                    </Col>
                </Row>
              </Col>
            </Row>
          </Tab.Container>
        )
    }
}

export default MainTabs;