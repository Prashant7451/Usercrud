import { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen.js";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createuser2s } from "../actions/user2Action.js";
import Loading from "../components/Loading.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Createuser2() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    const user2Create = useSelector((state) => state.user2Create);
    const { loading, error, user2s } = user2Create;
    const navigate = useNavigate();

    console.log(user2s);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(createuser2s(title, content, category));

        resetHandler();
        navigate("/mynotes");
    };

    useEffect(() => { }, []);

    return (
        <MainScreen title="Create a user">
            <Card>
                <Card.Header>Create a new user</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>user2 Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Create user
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset Feilds
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}