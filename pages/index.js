import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Home page</h1>
        </Layout>
    );
}
