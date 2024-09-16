import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar(props) {
    return (
        <AppBar position="static" width="100%">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.text}
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
    );
}