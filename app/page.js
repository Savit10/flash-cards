'use client'
import Stack from "@mui/material";
import Head from "next/head";
import Intro from "../components/Intro.jsx";
import Navbar from "../components/Navbar.jsx";
import Pricing from "../components/Pricing.jsx";
import Features from "../components/Features.jsx";

export default function Home() {
  return (
    <div style={{ width: '100vw', maxWidth: '100%' }}>
      <Head>
        <title key="title">Flash Card SAAS</title>
        <meta name="description" content="A SAAS to help you create and manage flash cards." />
      </Head>
      <Navbar text={"Home"} />
      <Stack direction="column" spacing={6}>
        <Intro />
        <Features/>
        <Pricing/>
      </Stack>
    </div>
  );
}
