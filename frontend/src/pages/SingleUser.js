import { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateuser2s } from "../actions/user2Action";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ReactMarkdown from "react-markdown";
import { deleteuser2 } from "../actions/user2Action";
import { useNavigate, useParams } from "react-router-dom";

export default function Singleuser2() {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();

    const user2Update = useSelector((state) => state.user2Update);
    const { loading, error } = user2Update;
    const user2Delete = useSelector((state) => state.user2Delete);
    const { error: errorDelete, loading: loadingDelete } = user2Delete;

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [id, date]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateuser2s(id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    };

    function deleteHandler(id) {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteuser2(id));
            navigate("/mynotes");
        }
    }

    return (
        <MainScreen title="Edit user">
            <Card>
                <Card.Header>Edit your user</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {loadingDelete && <Loading />}

                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content"
                                rows={4}
                                value={content}
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
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update user2
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(id)}
                        >
                            Delete user2
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}