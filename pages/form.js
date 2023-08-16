import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function Form() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Form page</h1>
        </Layout>
    );
}
