import React, { useState, useEffect } from 'react';
import WritePost from '../components/WritePost';
import CreateNewUser from './CreateNewUser';
import { Route, Routes } from 'react-router-dom';
import UserWorkSpace from '../components/UserWorkSpace'
import Login from './Login';
import SignInLogInBtns from './signInLogInBtns'

function Main() {


    return (
        <main className='main'>
            <Routes>
                <Route path='user'>
                    <Route index element={<SignInLogInBtns /> } />

                    <Route path='sign-up' element={<CreateNewUser />} />

                    <Route path='log-in' element={<Login />} />

                    <Route path=':id/*' element={<UserWorkSpace />}>
                        <Route path='write_post' element={<WritePost />} />
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}

export default Main;