import React, { useState, useEffect, useRef, useContext } from 'react';
// import { getUserDetails } from '../api/user.jsx'
// import { useQuery } from '@tanstack/react-query';
import { AppContext } from '../App.js';
import { setUser, getUserDetailsThunk, userStatus } from '../state/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Box } from '@mui/material';
import { CenterInnerContent } from '../styling/styles';
import { textAlign } from '@mui/system';

function Login() {
    const [inputValue, setInputValue] = useState<string>('')
    const [wrongId, setWrongId] = useState<boolean>(false)
    const { navToWorkSpace } = useContext(AppContext)
    const dispatch = useDispatch()
    const status = useSelector(userStatus)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(getUserDetailsThunk(inputValue));
    }

    useEffect(() => {
        console.log(status);
        status === 'succeeded' && navToWorkSpace()
        if (status === 'failed') {
            setWrongId(true)
            setInputValue('')
        }
    }, [status]);

    return (
        <CenterInnerContent>
            <Box component='form' onSubmit={handleSubmit} sx={{
                padding: '1em',
                border: '1px solid gray',
                borderRadius: '5px',
                textAlign: 'center'
            }}>
                <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                    Log in
                </Typography>
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="ID"
                    error={wrongId}
                    helperText={wrongId && "Wrong ID Try again"}
                    type="text"
                    onChange={(event) => setInputValue(event.target.value)}
                    // autoFocus
                    value={inputValue}
                    onClick={() => setWrongId(false)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: 2 }}>Log In</Button>
            </Box>
        </CenterInnerContent>
    )
}

export default Login;