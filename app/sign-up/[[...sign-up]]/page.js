import { SignUp } from "@clerk/nextjs";
import { Typography, Box} from "@mui/material";
import { AppBar, Toolbar, Button } from '@mui/material';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "../../components/Navbar";


export default function SignUpPage() {
    return (
        <div>
            <Navbar text={"Sign Up"}/>
            <Box display = {'flex'} flexDirection={'column'} alignItems = {'center'} justifyContent={'center'} gap={3} sx={{marginTop: 2}}>
                <Typography variant="h3"> Sign Up </Typography>
                <SignUp/>
            </Box>
        </div>
    )
}