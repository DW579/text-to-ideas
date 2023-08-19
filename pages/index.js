import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
    const [formData, setFormData] = useState({
        type: "",
        text: "",
    });

    const handleTextareaChange = (e) => {
        const text = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            text,
        }));
    };

    const handleTypeChange = (e) => {
        e.persist();

        setFormData((prevState) => ({
            ...prevState,
            type: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/form", formData);

            console.log("Form submitted successfully!", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
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
                >
                    Submit
                </Button>
            </Form>
        </Layout>
    );
}
