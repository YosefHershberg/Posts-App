import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material';
import { CenterInnerContent } from '../styling/styles';

const SignInLogInBtns = () => {
  return (
    <CenterInnerContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Link to={'sign-up'} >
          <Button
            variant="contained"
            size='large'
          >Sign up</Button>
        </Link >
        <Link to={'log-in'}>
          <Button variant="contained" size='large'>Log in</Button>
        </Link>
      </Box>
    </CenterInnerContent>
  )
}

export default SignInLogInBtns