import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import CreateNewUser from './CreateNewUser';
import Login from './Login';

function UserOption() {

    return (
        <>
            <Routes>
                <Route path='/' element={
                    <>
                        <Link to={'sign-up'}>
                            <button>Sign up</button>
                        </Link>
                        <Link to={'log-in'}>
                            <button>Log in</button>
                        </Link>
                    </>
                }>
                    <Route path='sign-up' element={<CreateNewUser />} />
                    <Route path='log-in' element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default UserOption;