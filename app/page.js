'use client'
import { Button, Grid, AppBar, Toolbar } from "@mui/material";
import {Typography, Box, Stack} from "@mui/material";
import Head from "next/head";

import getStripe from "../utils/getStripe.js";
import Intro from "../components/Intro.jsx";
import Navbar from "../components/Navbar.jsx";

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
  

  
  return (
    <div style={{ width: '100vw', maxWidth: '100%' }}>
      <Head>
        <title key="title">Flash Card SAAS</title>
        <meta name="description" content="A SAAS to help you create and manage flash cards." />
      </Head>
      <Navbar text={"Home"} />
      <Stack direction="column" spacing={6}>
        <Intro />
        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={5}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#34495E' }}>Features</Typography>
          <Grid container spacing={3}>
            {['Upload Text', 'Create Flashcards', 'Study Effectively'].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={3} sx={{
                  border: '2px solid',
                  borderRadius: '8px',
                  borderColor: '#2980B9',
                  padding: 1,
                  maxWidth: 300, 
                  boxShadow: '0px 2px 4px rgba(100,100,100,0.1)',
                  margin: 'auto' 
                }}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#2980B9', fontWeight: 'bold' }}>{feature}</Typography>
                  <Typography variant="body1" sx={{ color: '#555' }}>{{
                    'Upload Text': 'Easy upload of textual content',
                    'Create Flashcards': 'Let our software do its magic',
                    'Study Effectively': 'Use effective study methods to learn'
                  }[feature]}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box bgcolor="#F8F9FA" display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={1}>
          <Typography variant="h3" sx={{ marginTop: 2, fontWeight: 'bold', color: '#2C3E50' }}>Pricing</Typography>
          <Grid container spacing={4} sx={{ paddingBottom: 2 }}>
            <Grid item xs={12} md={6}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} flexDirection={'column'} sx={{
                boxShadow: '0px 4px 8px rgba(0,0,0,0.12)',
                borderRadius: 2,
                padding: 3,
                background: '#FFFFFF'
              }}>
                <Typography variant="h5" sx={{ color: '#27AE60', fontWeight: 'bold' }}>Basic</Typography>
                <Typography variant="h6" sx={{ color: '#34495E' }}>$5/month</Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>Access to basic flashcard features and limited storage</Typography>
                <Button variant="contained" color='primary' sx={{ marginTop: 2 }}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} flexDirection={'column'} sx={{
                boxShadow: '0px 4px 8px rgba(0,0,0,0.12)',
                borderRadius: 2,
                padding: 3,
                background: '#FFFFFF'
              }}>
                <Typography variant="h5" sx={{ color: '#C0392B', fontWeight: 'bold' }}>Pro</Typography>
                <Typography variant="h6" sx={{ color: '#34495E' }}>$10/month</Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>Unlimited flashcards and storage</Typography>
                <Button variant="contained" color='primary' sx={{ marginTop: 2 }} onClick={handleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
