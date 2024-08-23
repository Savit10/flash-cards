'use client'
import { useState, useEffect } from "react"
import {useRouter} from "next/navigation"
import getStripe from "../../utils/getStripe"
import { useSearchParams  } from "next/navigation"
import { CircularProgress, Container, Typography, Button } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')   

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!sessionId) return
            try {
                const res = await fetch(`/api/checkout_sessions?session_id=${sessionId}`)
                const session = await res.json()
                if (res.ok) {
                    setSession(session)
                }
                else {
                    setError(session.error)
                }
            } catch (error) {
                setError("An error occurred")
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [sessionId])

    if (loading) {
        return (
            <Container maxWidth ="100vw" sx = {{textAlign: 'center', mt: 4}}>
                <CircularProgress />
                <Typography variant = "h4" component = "h1" gutterBottom>
                    Loading...
                </Typography>
            </Container>
        )
    }
    if (error) {
        return (
            <Container maxWidth ="100vw" sx = {{textAlign: 'center', mt: 4}}>
                <CircularProgress />
                <Typography variant = "h4" component = "h1" gutterBottom>
                    {error}
                </Typography>
            </Container>
        )
    }
    return (
        <Container maxWidth ="100vw" sx = {{textAlign: 'center', mt: 4}}>
            <Typography variant = "h4"  gutterBottom>
                {session.payment_status === "paid" ? "Thank you for purchasing!" : "Payment Failed"}
            </Typography>
            <Typography variant = "h5"> Session Id: {sessionId}</Typography>
            <Button onClick = {() => router.push('/')} variant = "contained" color = "primary">Return to Home</Button>
        </Container>
    )

}

export default ResultPage;