import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function Intro() {

    const handleClick = () => {
        window.location.href = '/generate';
    };
    return (
        <Box width="100vw" display = {'flex'} bgcolor="#F0F0F0" justifyContent = {'center'} flexDirection={'column'} alignItems = {'center'} gap={3}
        sx ={{
            marginTop: 5,
            padding: 5,
            borderRadius: 2,
            boxShadow: 4,
        }}>
          <Typography variant = "h2"> Welcome to Flashcard SAAS</Typography>
          <Typography variant = "h5"> 
            {'  '}
            Create and manage flashcards with ease
          </Typography>
          <Button variant="contained" color = 'primary' sx = {{marginTop: 2}} onClick={handleClick}> Get Started </Button>
        </Box>
    );
}