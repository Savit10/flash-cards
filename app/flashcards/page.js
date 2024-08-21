'use client'

import { useUser } from "@clerk/clerk-react";
import {collection, doc, getDoc, setDoc, writeBatch} from "firebase/firestore";
import db from "../../firebase";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import { Typography, Box, Grid, Card, CardActionArea, CardContent, Container,  } from "@mui/material";

export default function Flashcards() {
    const {isSignedIn, isLoaded, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        async function getFlashcards() {
            if (!user) {
                return;
            }
            const userDocRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const collections = await docSnap.data().flashcards || [];
                setFlashcards(collections);
            }
            else {
                await setDoc(userDocRef, {flashcards: []});
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    }

    return (
        <Container sx={{width: '100%', maxWidth: '100vw'}}>
            <Typography variant="h3" >Flashcards</Typography>
            {flashcards.length > 0 && 
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (                  
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(flashcard)}>
                                        <CardContent>
                                            <Typography variant="h5" component="div"> {flashcard} </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                }
        </Container>
    )
}