import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary"
        >
            <Container>
                <Navbar.Brand href="#home">Text-to-Ideas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                        <Link href={"/about"}>About</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
