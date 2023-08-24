import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { Row, Col, Form, Button, Card, Accordion, Spinner, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
    const [errorData, setErrorData] = useState({
        error: "",
        display: false,
    });
    const [displayForm, setDisplayForm] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [displayDashboard, setDisplayDashboard] = useState(false);
    const [formData, setFormData] = useState({
        type: "",
        text: "",
    });
    const [dashboardData, setDashboardData] = useState(null);

    const handleTextareaChange = (e) => {
        const text = e.target.value;

        text.length !== 0 && formData.type !== "" ? setDisableButton(false) : setDisableButton(true);

        setFormData((prevData) => ({
            ...prevData,
            text,
        }));
    };

    const handleTypeChange = (e) => {
        e.persist();

        formData.text !== "" ? setDisableButton(false) : setDisableButton(true);

        setFormData((prevState) => ({
            ...prevState,
            type: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDisplayForm(false);
        setIsLoading(true);

        try {
            const response = await axios.post("/api/form", formData);

            setIsLoading(false);
            setDisplayDashboard(true);

            setDashboardData(response.data.data);

            console.log("Form submitted successfully!", response.data.data);
        } catch (error) {
            console.error("Error submitting form:", error);

            setErrorData(() => ({
                error: error.message,
                display: true,
            }));

            setDisplayForm(false);
            setIsLoading(false);
            setDisplayDashboard(false);
        }
    };

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            {errorData.display && (
                <Row>
                    <Col>
                        <Alert variant="danger">
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>Please try again by reloading the page.</p>
                            <hr />
                            <p className="mb-0">{errorData.error}</p>
                        </Alert>
                    </Col>
                </Row>
            )}
            {displayForm && (
                <Row>
                    <Col>
                        <h1>Welcome to Text-to-Ideas!</h1>
                        <p>Upload a document or text and let the LLM figure what is the main issue within the text and present you with project ideas to solve the issue.</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="textarea">
                                <Form.Label>Paste video transcript or document text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="text"
                                    value={formData.text}
                                    onChange={handleTextareaChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="typeOptions">
                                <Form.Check
                                    type="radio"
                                    name="selectedOption"
                                    value="large language model (llm)"
                                    label="Large Language Model (LLM)"
                                    checked={formData.type === "large language model (llm)"}
                                    onChange={handleTypeChange}
                                />
                                <Form.Check
                                    type="radio"
                                    name="selectedOption"
                                    value="mechanical"
                                    label="Mechanical"
                                    checked={formData.type === "mechanical"}
                                    onChange={handleTypeChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={disableButton}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            {isLoading && (
                <Row>
                    <Col>
                        <Spinner animation="border" />
                        <p>Loading...</p>
                    </Col>
                </Row>
            )}
            {displayDashboard && (
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Main Opportunity</Card.Title>
                                        <Card.Text>{dashboardData.mainIssue}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1>Ideas</h1>
                                <Accordion alwaysOpen>
                                    {dashboardData.ideas.map((idea, index) => (
                                        <Accordion.Item
                                            key={index}
                                            eventKey={index}
                                        >
                                            <Accordion.Header>{idea.title}</Accordion.Header>
                                            <Accordion.Body>{idea.description}</Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Col>
                            <Col>
                                <h1>Info</h1>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Summary</Accordion.Header>
                                        <Accordion.Body>{dashboardData.summary}</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Uploaded Text</Accordion.Header>
                                        <Accordion.Body>{formData.text}</Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </Layout>
    );
}
