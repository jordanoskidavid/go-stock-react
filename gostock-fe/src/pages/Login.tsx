import {useLogin} from "../hooks/useLogin.ts"
import {Container,Paper, Typography, Alert, Box, TextField,Button} from "@mui/material";
const Login = () =>{

    const {email, password,setEmail,setPassword,error,handleSubmit} = useLogin();

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, mt: 20, borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Log In
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', // Default outline color
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', color: '#008DDA'  // Outline color on hover
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', // Outline color when focused
                                },}}
                            required
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', // Default outline color
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', color: '#008DDA' // Outline color on hover
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#008DDA', // Outline color when focused
                                },}}
                            required
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, fontSize: 20, backgroundColor: '#008DDA', color:'#F7EEDD'}}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
export default Login;