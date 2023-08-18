// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { SimpleSequentialChain, LLMChain } from "langchain/chains";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";

import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default async function handler(req, res) {
    try {
        const data = {
            summary: "",
            mainIssue: "",
            ideas: [],
        };
        const type = req.body.type;
        // const text = req.body.text;

        // Create the summary from the loaded txt file
        const embeddings = new OpenAIEmbeddings();
        const summaryModel = new OpenAI({ temperature: 0 });
        const summaryChain = loadQARefineChain(summaryModel);

        // Load the documents and create the vector store
        const loader = new TextLoader("/users/dustinwurtz/desktop/example2.txt");
        const docs = await loader.loadAndSplit();
        const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

        // Select the relevant documents
        const question = "Create a one paragraph summary.";
        const relevantDocs = await store.similaritySearch(question);

        // Call the summary chain
        const summaryRes = await summaryChain.call({
            input_documents: relevantDocs,
            question,
        });

        // Get the summary
        const summary = summaryRes.output_text;

        // Add the summary to the data object
        data.summary = summary;

        // This is an LLMChain to find the main issue from the summary of the text
        const mainIssueModel = new OpenAI({ temperature: 0 });
        const mainIsueTemplate = `Create a short sentence of the main issue of the summary provided: {summary}`;
        const mainIssuePromptTemplate = new PromptTemplate({
            template: mainIsueTemplate,
            inputVariables: ["summary"],
        });
        const mainIssueChain = new LLMChain({
            llm: mainIssueModel,
            prompt: mainIssuePromptTemplate,
        });

        // This is an LLMChain to create 5 ideas to solve the main issue
        const ideasModel = new OpenAI({
            temperature: 1,
            maxTokens: 2000,
        });
        const ideasTemplate = `Create 5 large language modal app ideas to address the issue provided: 
            
            {mainIssue}
            
            Return your response in a json object with the mainIssue and an array of ideas with the title and description of each idea. Make sure the keys lowercase and no spaces.`;
        const ideasPromptTemplate = new PromptTemplate({
            template: ideasTemplate,
            inputVariables: ["mainIssue"],
        });
        const ideasChain = new LLMChain({
            llm: ideasModel,
            prompt: ideasPromptTemplate,
        });

        // This is a SimpleSequentialChain to run the main issue chain and then the ideas chain
        const overallChain = new SimpleSequentialChain({
            chains: [mainIssueChain, ideasChain],
            verbose: true,
        });

        // Run the overall chain with the summary from document loader
        const ideas = await overallChain.run(summary);
        console.log(ideas);

        // Turn ideas into a json object
        const ideasObject = JSON.parse(ideas);

        data.mainIssue = ideasObject.mainIssue;

        data.ideas = ideasObject.ideas;

        res.status(200).json({ data: data });
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}
