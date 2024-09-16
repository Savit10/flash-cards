'use client'
import {Stack, AppBar, Toolbar, Typography, Button} from "@mui/material";
import Head from "next/head";
import Intro from "./components/Intro.jsx";
import Navbar from "./components/Navbar.jsx";
import Pricing from "./components/Pricing.jsx";
import Features from "./components/Features.jsx";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div style={{ width: '100vw', maxWidth: '100%' }}>
      <Head>
        <title key="title">Flash Card SAAS</title>
        <meta name="description" content="A SAAS to help you create and manage flash cards." />
      </Head>
      <AppBar position="static" width="100%">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"Home"}
            </Typography>
            <SignedIn>
                <Button color="inherit" >Sign Out</Button>
            </SignedIn>
            <SignedOut>
                <Button color="inherit" href="/sign-in"  sx={{ marginRight: 2 }}> Sign In </Button>
                <Button color="inherit" href="/sign-up" > Sign Up  </Button>
            </SignedOut>
            </Toolbar>
        </AppBar>
      <Stack direction="column" spacing={6}>
        <Intro />
        <Features/>
        <Pricing/>
      </Stack>
    </div>
  );
}
