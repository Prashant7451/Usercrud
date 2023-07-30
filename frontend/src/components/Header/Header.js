import { NavDropdown, Navbar, Nav, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction.js';
import { useNavigate } from "react-router-dom";

export default function Header({ setSearch }) {

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();

    function logoutHandler() {
        dispatch(logout());
        navigate("/")
    }

    return (
        <Navbar bg="primary" expand="lg" varient="dark">
            <Container>
                <Navbar.Brand href="/">User Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form inline="true">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form>

                    {userInfo ? <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link to="/mynotes" href="/mynotes"> My Users</Nav.Link>
                        <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav> : <Nav.Link to="/login" href='/login'>Login</Nav.Link>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

