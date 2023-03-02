import React, { useState, useEffect, useContext } from 'react';
import { deletePost } from '../api/posts'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostsCotext } from './UserWorkSpace';
import { useDispatch } from 'react-redux';
import { deletePost_store } from '../state/postsSlice'
import { post } from '../types';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

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
        <Card sx={{ width: '18em', marginBottom: '.5em' }} variant="outlined">
            <CardContent>
                <Typography variant="body2">
                    {post.text}
                </Typography>
            </CardContent>
            <Typography sx={{ fontSize: 14, paddingX: 2 }} color="text.secondary" gutterBottom>
                Last Updated: {new Date(post.updatedDate).toLocaleString()}
            </Typography>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link to={`edit/${post.id}`}>
                    <Button variant='contained' color="primary">Edit</Button>
                </Link>
                <Button
                    variant='contained'
                    onClick={handleDeletePost}
                    color='error'
                >Delete</Button>
            </CardActions>
        </Card>
    );
}

export default Post;