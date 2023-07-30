import { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser2, listuser2s } from "../actions/user2Action";
import Loading from "../components/Loading.js";
import Error from "../components/ErrorMessage.js";

export default function Myuser2s({ search }) {

    const dispatch = useDispatch();
    const user2List = useSelector((state) => state.user2List);
    const { loading, error, user2s } = user2List;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const user2Create = useSelector((state) => state.user2Create);
    const { success: successCreate } = user2Create;
    const user2Update = useSelector((state) => state.user2Update);
    const { success: successUpdate } = user2Update;
    const user2Delete = useSelector((state) => state.user2Delete);
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = user2Delete;

    useEffect(() => {
        dispatch(listuser2s());
        if (!userInfo) {
            navigate("/");
        }
    }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete])


    function deleteHandler(id) {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteuser2(id));
        }
    }

    return (

        <MainScreen title={`Welcome Back ${userInfo.name}...`}>
            <Link to="/createusers">
                <Button size="lg" style={{ marginLeft: 10, marginRight: 6 }}>
                    Create New User
                </Button>
            </Link>
            {errorDelete && <Error variant="danger">{errorDelete}</Error>}
            {error && <Error variant="danger">{error}</Error>}
            {loading && <Loading />}
            {loadingDelete && <Loading />}

            {
                user2s?.reverse().filter((filteruser2s) => {
                    return filteruser2s.title.toLowerCase().includes(search.toLowerCase())
                }).map(user2 => (
                    <Accordion defaultActiveKey="0" key={user2._id}>
                        <Card style={{ margin: 10 }}>
                            <Card.Header style={{ display: "flex" }}>
                                <span
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18,
                                    }}
                                >
                                    <Accordion.Header
                                        as={Card.Text}
                                        variant="link"
                                        eventkey="0"
                                    >
                                        {user2.title}
                                    </Accordion.Header>
                                </span>
                                <Button href={`/user2/${user2._id}`}>Edit</Button>
                                <Button variant="danger" className="mx-2" onClick={() => deleteHandler(user2._id)}>Delete</Button>
                            </Card.Header>
                            <Accordion.Body eventkey="0">
                                <Card.Body>
                                    <h4>
                                        <Badge variant="success" >
                                            Category - {user2.category}
                                        </Badge>
                                    </h4>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {user2.content}
                                        </p>
                                        <footer className="blockquote-footer">
                                            Created on:- {" "}
                                            <cite title="Source Title">
                                                {user2.createdAt.substring(0, 10)}
                                            </cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Body>
                        </Card>
                    </Accordion>
                ))
            }
        </MainScreen>
    );
}