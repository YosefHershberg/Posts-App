import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { editPost, getPost } from '../api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { AppContext } from '../App';
import { editPost_store } from '../state/postsSlice';
import WritePostDumb from '../dumb-components/WritePostDumb';

function EditPost() {
    const { id } = useParams()
    const [textAreaValue, setTextAreaValue] = useState('')
    const queryClient = useQueryClient()
    const { navToWorkSpace } = useContext(AppContext)
    const dispatch = useDispatch()

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
        getPost(id)
            .then(res => setTextAreaValue(res.data.text))
    }, []);

    return (
        <WritePostDumb
            textAreaValue={textAreaValue}
            setTextAreaValue={setTextAreaValue}
            handleSubmitPost={handleSubmitPost}
            title={'Edit Post'}
            btnTitle={'Update'}
        />
    )
}

export default EditPost;