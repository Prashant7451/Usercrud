import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MainScreen from "../components/MainScreen.js";
import { Link } from "react-router-dom";
import "../components/MainScreen.css";
import { useEffect, useState } from 'react';
import Loading from "../components/Loading.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userAction.js';
import { useNavigate } from "react-router-dom";



export default function LoginPage() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    async function submitHandle(e) {
        e.preventDefault();

        await dispatch(login(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            // history.push("/mynotes")
            navigate("/mynotes")
        }
    }, [userInfo, navigate])


    return (
        <MainScreen title="LOGIN">
            <div className='form-css'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandle}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="current-password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register" className="form-link">Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}