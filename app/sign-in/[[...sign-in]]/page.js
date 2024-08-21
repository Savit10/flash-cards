import { SignIn } from "@clerk/nextjs";
import {Typography, Box} from "@mui/material";
import { AppBar, Toolbar, Button } from '@mui/material';
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div>
            <AppBar position="static" width="100%">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Flash Card SAAS
                    </Typography>
                 </Toolbar>
            </AppBar>
            <Box display = {'flex'} flexDirection={'column'} alignItems = {'center'} justifyContent={'center'} gap={3} sx={{marginTop: 2}}>
                <Typography variant="h3"> Sign In </Typography>
                <SignIn/>
            </Box>
        </div>
    )
}