import * as React from "react"
import {
    Nav, NavItem, NavLink, Navbar,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap"

interface ToolbarProps {
    save: () => void
    load: () => void
    addEquip: () => void
    addFeat: () => void
    addAttack: () => void
}

export default class Toolbar extends React.Component<ToolbarProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }
    }

    toggle() {
        this.setState((prevState) => {
            return { dropdownOpen: !prevState.dropdownOpen }
        })
    }

    render() {
        return (
            <Navbar dark color="dark" sticky="top" expand>
                <Nav navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>File</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.props.save}>Save</DropdownItem>
                            <DropdownItem onClick={this.props.load}>Load</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink href="#" onClick={this.props.addEquip}>Add Equipment</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={this.props.addFeat}>Add Feat</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={this.props.addAttack}>Add Attack</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}