import React, { useState, useEffect } from 'react';
import WritePost from '../components/WritePost';
import CreateNewUser from './CreateNewUser';
import { Route, Routes } from 'react-router-dom';
import UserWorkSpace from '../components/UserWorkSpace'
import Login from './Login';
import SignInLogInBtns from './signInLogInBtns'
import { MainComp } from '../styling/styles'

function Main() {
    return (
        <MainComp> 
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
        </MainComp>
    )
}

export default Main;