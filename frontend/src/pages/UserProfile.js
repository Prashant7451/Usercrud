import { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../components/MainScreen.js";
import "./LandingPage.css";
import Loading from "../components/Loading.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { updateProfile } from "../actions/userAction.js";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [navigate, userInfo])

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
            }).then((res) => res.json()).then((data) => { setPic(data.url.toString()); }).catch((err) => { console.log(err); });
        } else {
            return setPicMessage("Please Select an Image");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProfile({ name, email, password, pic }));
    };

    return (
        <MainScreen title="EDIT PROFILE">
            <div>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    autoComplete="username"
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    autoComplete="username"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    autoComplete="confirm-password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
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
                            <Button type="submit" varient="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profilePic" />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}