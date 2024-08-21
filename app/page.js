'use client'
import { Button, Grid, AppBar, Toolbar } from "@mui/material";
import {Typography, Box, Stack} from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import getStripe from "../utils/getStripe.js";

export default function Home() {

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'http://localhost:3000',
        },
      });
  
      const checkoutSessionData = await checkoutSession.json();
  
      if (checkoutSession.status === 500) {
        console.error(checkoutSessionData.message);
        return;
      }
  
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionData.id,
      });
  
      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error.message);
    }
  };
  

  const handleClick = () => {
    window.location.href = '/generate';
  }
  return (
    <div style={{ width: '100vw', maxWidth: '100%' }}>
      <Head>
        <title key="title">Flash Card SAAS</title>
        <meta name="description" content="A SAAS to help you create and manage flash cards." />
      </Head>
      <AppBar position="static" width="100%">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flash Card SAAS
          </Typography>
          <SignedIn>
            <Button color="inherit" >Sign Out</Button>
          </SignedIn>
          <SignedOut>
            <Button color="inherit" href="sign-in"  sx={{ marginRight: 2 }}> Sign In </Button>
            <Button color="inherit" href="sign-up" > Sign Up  </Button>
          </SignedOut>
        </Toolbar>
      </AppBar>
      
      <Stack direction="column" spacing={6} >
        <Box width="100vw" height="50vh" display = {'flex'} bgcolor="#F0F0F0" justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={3}>
          <Typography variant = "h2"> Welcome to Flashcard SAAS</Typography>
          <Typography variant = "h5"> 
            {'  '}
            Create and manage flashcards with ease
          </Typography>
          <Button variant="contained" color = 'primary' sx = {{marginTop: 2}} onClick={handleClick}> Get Started </Button>
        </Box>
        <Box display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={5} >
          <Typography variant="h3"> Features </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={3}>
                <Typography variant="h5" gutterBottom> Upload Text </Typography>
                <Typography variant="p"> Easy upload of textual content</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={3}>
                <Typography variant="h5" gutterBottom> Create Flashcards </Typography>
                <Typography variant="p"> Let our software do it's magic</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={3}>
                <Typography variant="h5" gutterBottom> Study Effectively </Typography>
                <Typography variant="p"> Use effective study methods to learn</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box bgcolor="#F0F0F0" display = {'flex'} justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={1}>
          <Typography variant="h3" sx = {{marginTop: 2}}> Pricing </Typography>
          <Grid container spacing={4} sx = {{marginBottom: 1, marginTop: 1}}>
            <Grid item xs={12} md={6} sx = {{marginBottom: 1}}>
              <Box display = {'flex'} justifyContent = {'center'} alignItems = {'center'} gap={3} flexDirection={'column'} sx = {{
                border: '1px solid',
                borderRadius: 2,
                padding: 2,
                borderColor: 'primary.main',
                marginLeft: 2
              }}>
                <Typography variant="h5"> Basic </Typography>
                <Typography variant="h6"> $5/month</Typography>
                <Typography variant="p"> Access to basic flashcard features and limited storage</Typography>
                <Button variant="contained" color = 'primary' sx = {{marginTop: 2}}> Choose Basic </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx = {{marginBottom: 1}}>
            <Box display = {'flex'} justifyContent = {'center'} alignItems = {'center'} gap={3} flexDirection={'column'} sx = {{
                border: '1px solid',
                borderRadius: 2,
                padding: 2,
                borderColor: 'primary.main',
                marginRight: 2
              }}>
                <Typography variant="h5"> Pro </Typography>
                <Typography variant="h6"> $10/month</Typography>
                <Typography variant="p"> Unlimited flashcards and storage</Typography>
                <Button variant="contained" color = 'primary' sx = {{marginTop: 2}} onClick={handleSubmit}> Choose Pro </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
