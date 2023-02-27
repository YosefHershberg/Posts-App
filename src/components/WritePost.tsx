import React, { useState, useEffect, useContext, useRef } from 'react';
import { PostsCotext } from './UserWorkSpace';
import { createPost } from '../api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { currentUser } from '../state/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../App';
import { addPost } from '../state/postsSlice'
import { Form, Input, Button } from 'reactstrap'

function WritePost() {
    const [textAreaValue, setTextAreaValue] = useState('')
    const queryClient = useQueryClient()
    const { postsQuery } = useContext(PostsCotext)
    const user = useSelector(currentUser)
    const { navToWorkSpace } = useContext(AppContext)
    const dispatch = useDispatch()
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const createPostMutation = useMutation({
        mutationFn: createPost,
        // mutationFn: () => {},
        onMutate: data => dispatch(addPost(data)),
        onSuccess: data => {
            queryClient.invalidateQueries(['posts'])
            queryClient.setQueryData(['posts'], postsQuery) // this sets the dat into the cache
            //  ^^^ this makes sure that the new data is set in the query and rendered immediatly
            // ...and not added to the query next time the query is called
        }
        // onError:
        // onSettled () => {} // like .finally()
        // onSuccess (data, variebles, context) => {} // 'data' is the data return from the mutationFn
        // onMutate () => {} // the data return here is set as the 'content'
        // retry: 3 // if error accures the will retry the mutationFn 3 times 
    })

    async function handleSubmitPost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createPostMutation.mutate({ owner: user, text: textAreaValue })
        navToWorkSpace()
        // createPostMutation.mutateAsync // this returns a promise // VERY USEFULL
        setTextAreaValue('')
    }

    useEffect(() => {
        textAreaRef.current?.focus()
    }, []);

    return (
        <Form onSubmit={handleSubmitPost} className='write-form-container'>
            <h2>Write Post</h2>
            <Input
                innerRef={textAreaRef}
                onChange={(event) => setTextAreaValue(event.target.value)}
                value={textAreaValue}
                name="post"
                type='textarea'
            ></Input>
            <Button
                size='lg'
                color='primary'
                disabled={textAreaValue === ''}
            >Post</Button>
        </Form>
    );
}

export default WritePost;