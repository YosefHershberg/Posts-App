import React, { useState, useEffect, useRef, useContext } from 'react';
// import { getUserDetails } from '../api/user.jsx'
// import { useQuery } from '@tanstack/react-query';
import { AppContext } from '../App.js';
import { Form, Card, Button, Input, FormFeedback } from 'reactstrap'
import { setUser, getUserDetailsThunk, userStatus } from '../state/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const [inputValue, setInputValue] = useState('')
    const [id, setId] = useState('')
    const [wrongId, setWrongId] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const { navToWorkSpace } = useContext(AppContext)
    const dispatch = useDispatch()
    const status = useSelector(userStatus)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            dispatch(getUserDetailsThunk(inputValue));
        } catch (error) {
            console.error(error);
            setWrongId(true)
            setInputValue('')
            inputRef.current?.focus()
        }
    }

    useEffect(() => {
        console.log(status);
        status === 'succeeded' && navToWorkSpace()
    }, [status]);

    // useEffect(() => {
    //     id != '' && console.log(id)
    //     id != '' && navToWorkSpace(id)
    // }, [id]);

    return (
        <Form className='new-user-form' onSubmit={handleSubmit}>
            <Card style={{
                minHeight: '10em',
                width: '20em',
                padding: '1em',
            }}>
                <h3>Enter user ID</h3>
                <Input
                    invalid={wrongId}
                    innerRef={inputRef}
                    type="text"
                    onChange={(event) => setInputValue(event.target.value)}
                    value={inputValue}
                />
                <FormFeedback>
                    Wrong Id. Try again
                </FormFeedback>
                <Button
                    className='mt-3'
                    disabled={!inputValue}
                // onClick={handleSubmit}
                >Submit</Button>
            </Card>
        </Form>
    )
}

export default Login;