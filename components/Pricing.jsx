import { Box, Button, Grid, Typography } from "@mui/material";
import React from 'react';
import getStripe from "../utils/getStripe.js";

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

export default function Pricing() {
    
    return (
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
    </Box>)
}