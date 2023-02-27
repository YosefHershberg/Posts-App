import React from 'react'
import { Card, Button } from 'reactstrap'
import { Link } from 'react-router-dom'


const SignInLogInBtns = () => {
  return (
    <div className='new-user-form'>
      {/* <Card style={{
        height: '10em',
        width: '10em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}> */}
        <Link to={'sign-up'} >
          <Button className='m-2'>Sign up</Button>
        </Link >
        <Link to={'log-in'}>
          <Button className='m-2'>Log in</Button>
        </Link>
      {/* </Card> */}
    </div>
  )
}

export default SignInLogInBtns