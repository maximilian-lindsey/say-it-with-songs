import Head from "next/head";
import { App } from "../components/App/App";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Say It With Songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
      <Footer />
    </div>
  );
}
