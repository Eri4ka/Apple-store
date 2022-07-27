import { Component } from 'react'
import { DropdownButton, Dropdown, Button, Row, Col } from 'react-bootstrap'


class MainSort extends Component {

    onSort = (e) => {
        e.stopPropagation()
        this.props.onSort(e.target.getAttribute('data-name'))
    }

    render() {

        const sortsData = [
            { name: "all", value: "По умолчанию"},
            { name: "increase", value: "По возрастанию цены"},
            { name: "decrease", value: "По убыванию цены"}
        ]

        const sortsItems = sortsData.map(({name, value}) => {
            const activeSort = this.props.sort === name

            return (
                <Dropdown.Item 
                    key={name}
                    as={Button} 
                    data-name={name}
                    active={activeSort ? 'active' : null}
                    onClick={this.onSort}>
                        {value}
                </Dropdown.Item>
            )
        })

        return (
        <>
            <Row className="mb-3">
                <Col>
                    <DropdownButton id="dropdown-basic-button" title="Сортировка">
                        {sortsItems}
                    </DropdownButton>
                </Col>
            </Row>
        </>
        )
    }
}

export default MainSort;