import Head from "next/head";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export const siteTitle = "Text-to-Ideas Website";

export default function Layout({ children, home }) {
    return (
        <Container>
            <Head>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
                <meta
                    name="description"
                    content="Generate project ideas from text"
                />
                <meta
                    name="og:title"
                    content={siteTitle}
                />
            </Head>
            <Navbar
                expand="lg"
                className="bg-body-tertiary"
            >
                <Container>
                    <Navbar.Brand>Text-to-Ideas</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link
                                href="/"
                                legacyBehavior
                                passHref
                            >
                                <Nav.Link>Home</Nav.Link>
                            </Link>
                            <Link
                                href="/about"
                                legacyBehavior
                                passHref
                            >
                                <Nav.Link>About</Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
            <main>{children}</main>
        </Container>
    );
}
