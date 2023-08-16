import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";

export default function Home() {
    const [item, setItem] = useState({ typeOfIdeas: "" });

    const { typeOfIdeas } = item;

    const handleChange = (e) => {
        e.persist();
        console.log(e.target.value);

        setItem((prevState) => ({
            ...prevState,
            typeOfIdeas: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${typeOfIdeas}`);
      };

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Welcome to Text-to-Ideas!</h1>
            <p>Upload a document or text and let the LLM figure what is the main issue within the text and present you with project ideas to solve the issue.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group
                    controlId="formFile"
                    className="mb-3"
                >
                    <Form.Label>Upload document</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Copy and Paste if needed</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
                <Form.Group controlId="typeOfIdeas">
                    <Form.Check
                        value="large language model (llm)"
                        type="radio"
                        aria-label="radio 1"
                        label="Large Language Model (LLM)"
                        onChange={handleChange}
                        checked={typeOfIdeas === "large language model (llm)"}
                    />
                    <Form.Check
                        value="mechanical"
                        type="radio"
                        aria-label="radio 2"
                        label="Mechanical"
                        onChange={handleChange}
                        checked={typeOfIdeas === "mechanical"}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Layout>
    );
}
