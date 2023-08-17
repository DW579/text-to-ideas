import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
    const [formData, setFormData] = useState({
        ideaType: "",
        document: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        setFormData((prevData) => ({
            ...prevData,
            document: file,
        }));
    };

    const handleIdeaTypeChange = (e) => {
        e.persist();
        console.log(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            ideaType: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/hello", formData);
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
                <Form.Group
                    controlId="formFile"
                    className="mb-3"
                >
                    <Form.Label>Upload document</Form.Label>
                    <Form.Control
                        type="file"
                        name="document"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                    />
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
                <Form.Group controlId="typeOptions">
                    <Form.Check
                        type="radio"
                        name="selectedOption"
                        value="large language model (llm)"
                        label="Large Language Model (LLM)"
                        checked={formData.ideaType === "large language model (llm)"}
                        onChange={handleIdeaTypeChange}
                    />
                    <Form.Check
                        type="radio"
                        name="selectedOption"
                        value="mechanical"
                        label="Mechanical"
                        checked={formData.ideaType === "mechanical"}
                        onChange={handleIdeaTypeChange}
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
