import { Component } from 'react'
import { DropdownButton, Dropdown, Button, Container, Row, Col } from 'react-bootstrap'


class MainFilters extends Component {

    state = {
        activeButton: '',
        activeContent: ''
    }

    chooseFilter = (e) => {
        const val = e.target.textContent
        e.stopPropagation()
        this.props.chooseFilter(val)

        this.setState({
            activeButton: e.target.getAttribute('data-name'),
            activeContent: e.target.getAttribute('data-active')
        })
    }

    render() {

        const {products, activeTab} = this.props

        const storages = products.map(prod => prod.group_id === activeTab ? prod.storage : null) 
        .filter((elem, i, v) => v.indexOf(elem) === i)
        .map((storage, i) => 
                <Dropdown.Item 
                    key={i} 
                    as={Button} 
                    onClick={this.chooseFilter} 
                    data-name={storage} 
                    data-active={activeTab} 
                    active={this.state.activeButton === storage && parseInt(this.state.activeContent) === activeTab ? 'active' : null}>
                        {storage}
                </Dropdown.Item>
            )

        return (
        <Container className="mb-3">
            <Row>
                <Col xs={6} xl={12}>
                    <DropdownButton id="dropdown-basic-button" title="Объем памяти">
                        {storages}
                    </DropdownButton>
                </Col>
                <Col xs={6} xl={12}>
                    <DropdownButton id="dropdown-basic-button2" title="Объем памяти">
                
                    </DropdownButton>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default MainFilters;