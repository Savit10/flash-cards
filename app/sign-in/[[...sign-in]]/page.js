import Navbar from "@/app/components/Navbar";
import { SignIn} from "@clerk/nextjs";
import { Typography, Box } from "@mui/material";

export default function SignInPage() {
  return (
    <div>
      <Navbar text={"Sign In"}/>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        sx={{ marginTop: 2 }}
      >
        <Typography variant="h3"> Sign In </Typography>
        <SignIn />
      </Box>
    </div>
  );
}
