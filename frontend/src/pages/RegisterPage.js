import MainScreen from "../components/MainScreen.js";
import Loading from "../components/Loading.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../components/MainScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction.js";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [picMessage, setPicMessage] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const navigate = useNavigate();


    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate("/mynotes")
        }
    }, [userInfo, navigate])

    const postDetails = async (pics) => {

        if (!pics) {
            return setPicMessage("Please select a Image ")
        }
        setPicMessage(null);

        if (pics) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Note-making");
            data.append("cloud_name", "prabhat021");
            await fetch("https://api.cloudinary.com/v1_1/prabhat021/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage("Password dosen't Match");
        } else {
            dispatch(register(name, email, password, pic))
        }
    }

    return (
        <MainScreen title="REGISTER">
            <div className="form-css">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            autoComplete="username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="formFile">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            onChange={(e) => postDetails(e.target.files[0])}
                            type="file"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login" className="form-link">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}