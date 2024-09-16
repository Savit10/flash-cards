import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function Features() {
    return (
        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={3}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#34495E' }}>Features</Typography>
        <Grid container spacing={3}>
          {['Upload Text', 'Create Flashcards', 'Study Effectively'].map((feature, index) => (
            <Grid item xs={12} md={4} key={index} >
              <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={3} sx={{
                border: '2px solid',
                borderRadius: '8px',
                borderColor: '#2980B9',
                padding: 1,
                maxWidth: 300, 
                boxShadow: '0px 2px 4px rgba(100,100,100,0.1)',
                margin: 'auto', 
                '&:hover': {
                    transform: 'scale(1.05)',
                    transitionDuration: '0.3s',
                },
                '&:not(:hover)': {
                    transform: 'scale(1)',
                    transitionDuration: '0.3s',
                }
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
    );
}