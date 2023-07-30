import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";

export default function LandingPage() {
    return (
        <section className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <h1 className="title">Welcome to User Info</h1>
                        <p className="sub-title">One safe Place for your data</p>
                        <div className="button">
                            <a href="/login">
                                <Button size="lg" className="landingbutton mr-4" >
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button size="lg" className="landingbutton ml-4" variant="outline-primary" >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>

                </Row>
            </Container>
        </section>
    );
}