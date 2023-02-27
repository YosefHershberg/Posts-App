import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '../state/userSlice'
import { AppContext } from '../App';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Spinner,
} from 'reactstrap';

type navbarProps = {
    isFetching: boolean
}

function NavbarComp({ isFetching }: navbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { navToWorkSpace } = useContext(AppContext);
    const user = useSelector(currentUser)

    return (
        <>
            <Navbar expand='md'>
                <NavbarBrand href="/" className='navbar-brand'>Posts App</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="#">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={navToWorkSpace}>
                                Posts
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className='d-flex align-items-center'>
                            {isFetching && <Spinner size='sm' />}
                        </NavItem>
                    </Nav>
                    {<NavbarText>{user.firstName} {user.lastName}</NavbarText>}
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavbarComp;