import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { editPost, getPost } from '../api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostsCotext } from './UserWorkSpace';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../state/userSlice'
import { AppContext } from '../App';
import { editPost_store } from '../state/postsSlice';
import { Form, Input, Button } from 'reactstrap'

function EditPost() {
    const { id } = useParams()
    const [textAreaValue, setTextAreaValue] = useState('')
    const queryClient = useQueryClient()
    const { postsQuery } = useContext(PostsCotext)
    const { navToWorkSpace } = useContext(AppContext)
    const user = useSelector(currentUser)
    const dispatch = useDispatch()
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const editPostMutation = useMutation({
        mutationFn: editPost, //Why does this navigate the URL somewhere wierd
        onMutate: data => dispatch(editPost_store({ text: textAreaValue, id: id })),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            // queryClient.setQueryData(['posts'], (oldData) => {

            // })
        }
    })

    function handleSubmitPost() {
        console.log(id);
        editPostMutation.mutate({ id: id, text: textAreaValue })
        navToWorkSpace()
    }

    useEffect(() => {
        textAreaRef.current?.focus()
        getPost(id)
            .then(res => setTextAreaValue(res.data.text))
    }, []);

    return (
        <Form onSubmit={handleSubmitPost} className='write-form-container'>
            <h2>Edit Post</h2>
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
                onClick={handleSubmitPost}
            >Update</Button>
        </Form>
    )
}

export default EditPost;