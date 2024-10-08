'use client'
import { AppBar, Toolbar, Typography, Box, Paper, TextField, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, CircularProgress } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import db from '../../firebase';
import { collection, writeBatch, doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";


export default function Generate() {
    const {isLoaded, isLoggedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: text,
        })
        .then(res => (
            console.log(res),
            res.json()))
        .then(data => setFlashcards(data.flashcards))
        .catch(err => console.log(err));
    }

    const handleFlip = (id) => { 
        setFlipped((prev) => (
            { ...prev, [id]: !prev[id]  }
        ))
    }

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    const handleSave = async () => {
        if (!name) {
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().collections || [];
            if (collections.includes(name)) {
                alert("Flashcards with this name already exists");
                return;
            }
            else {
                collections.push(name);
                batch.set(userDocRef, {flashcards: collections}, {merge: true}); 
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]});
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const docRef = doc(colRef);
            batch.set(docRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    }

    return (
        <div>
            <Navbar text={"Generate Flashcards"}/>
            <Box display = {'flex'} flexDirection={'column'} alignItems = {'center'} justifyContent={'center'} gap={3} sx={{marginTop: 2}}>
                <Typography variant="h3"> Generate Flash Cards </Typography>
                <Paper sx={{padding: 2, width: '100%'}}>
                    <TextField value={text} onChange={(e) => setText(e.target.value)} label="Enter Text" 
                    fullWidth multiline rows={4} variant = 'outlined' sx = {{mb: 2}}/>
                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Generate</Button>
                </Paper>
                {clicked && flashcards.length === 0? <CircularProgress/>
                : 
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (                  
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => (handleFlip(index))}>
                                        <CardContent>
                                            <Box sx={
                                                {
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[index]? 'rotateY(180deg)': 'rotateY(0deg)',
                                                    }, 
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        textAlign: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                    },
                                                    '& > div > div:nth-of-type(2)':{
                                                        transform: 'rotateY(180deg)',
                                                    }
                                                }
                                            }>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div"> {flashcard.front} </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div"> {flashcard.back} </Typography>
                                                    </div>
                                                </div>                                               
                                            </Box>
                                        </CardContent>
                                        </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                }
                <Box display = {'flex'} justifyContent={'center'} gap={3} sx={{mt: 4}}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>Save</Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Save Flashcards </DialogTitle>
                <DialogContent>
                    <DialogContentText> Enter the name of the collection </DialogContentText>
                    <TextField autoFocus margin="dense"value={name} type={text}onChange={(e) => setName(e.target.value)} label="Collection Name" fullWidth variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={handleSave}> Save </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}