import React, { useState, useEffect, useContext } from "react";
// import { createUser, callApi } from "../api/user";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, userStatus } from "../state/userSlice";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CenterInnerContent } from '../styling/styles'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function CreateNewUser() {
    const { navToWorkSpace } = useContext(AppContext);
    const dispatch = useDispatch()
    const status = useSelector(userStatus)
    const [isntValid, setIsntValid] = useState(false)
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(createUserThunk(user))
    }

    useEffect(() => {
        status === 'failed' && setIsntValid(true)
        status === 'succeeded' && navToWorkSpace();
    }, [status]);

    useEffect(() => {
        isntValid && setUser(prev => ({ ...prev, email: "" }))
    }, [isntValid]);

    useEffect(() => {
        user.email !== '' && setIsntValid(false)
    }, [user.email]);

    return (
        <CenterInnerContent>
            <Container component="main" maxWidth="xs" sx={{height: '100%'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="First Name"
                            onChange={(event) =>
                                setUser({ ...user, firstName: event.target.value })
                            }
                            value={user.firstName}
                        // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="Last Name"
                            onChange={(event) =>
                                setUser({ ...user, lastName: event.target.value })
                            }
                            value={user.lastName}
                        />
                        <TextField
                            error={isntValid}
                            helperText={isntValid && "Email address Already used. Try Again!"}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                            value={user.email}
                            onClick={() => setIsntValid(false)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!(user.email !== '' && user.firstName !== '' && user.lastName !== '')}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            {/* <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </CenterInnerContent>
    );
}

export default CreateNewUser;
