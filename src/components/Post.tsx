import React, { useState, useEffect, useContext } from 'react';
import { deletePost } from '../api/posts'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostsCotext } from './UserWorkSpace';
import { Card, CardText, CardTitle, Button, CardBody, CardFooter } from 'reactstrap'
import { useDispatch } from 'react-redux';
import { deletePost_store } from '../state/postsSlice'
import { post } from '../types';

type postProps = {
    post: post
}

function Post({ post }: postProps) {
    const queryClient = useQueryClient()
    const { postsQuery } = useContext(PostsCotext)
    const dispatch = useDispatch()

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onMutate: id => dispatch(deletePost_store(id)),
        onSettled: () => {
            queryClient.invalidateQueries(['posts'])
            queryClient.setQueryData(['posts'], postsQuery)
        }
    })

    function handleDeletePost() {
        deletePostMutation.mutate(post.id)
    }

    return (
        <Card className="post-container"
            style={{
                width: '18rem',
                margin: '1em',
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    Special Title Treatment
                </CardTitle>
                <CardText>
                    {post.text}
                </CardText>
            </CardBody>
            <CardFooter className='d-flex justify-content-around'>
                <Link to={`edit/${post.id}`}>
                    <Button color="primary">Edit</Button>
                </Link>
                <Button onClick={handleDeletePost} color='danger'>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default Post;