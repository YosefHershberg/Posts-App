import React, { useState, useEffect, useContext } from 'react';
import { PostsCotext } from './UserWorkSpace';
import { useQueryClient, useQuery } from "@tanstack/react-query"
import Post from './Post'
import { allPosts } from '../state/postsSlice'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, Typography } from '@mui/material'
import { PostListComp } from '../styling/styles'
import { Link } from 'react-router-dom';

function PostsList() {
    const allPostsData = useSelector(allPosts)
    const postsQuery = useContext(PostsCotext)
    // const [listContent, setListContent] = useState()

    // useEffect(() => {
    //     loadListContent()
    // }, [postsQuery]);

    // function loadListContent() {
    //     // postsQuery.refetch()
    //     if (postsQuery.status === 'success') {
    //         setListContent(allPostsData.map(post => <Post key={post.id} post={post} loadListContent={loadListContent} />))
    //     } else if (postsQuery.status === 'loading') {
    //         setListContent('Loading...')
    //     } else if (postsQuery.status === 'error') {
    //         setListContent('error!')
    //     }
    // }

    return (
        <PostListComp id="post-list">
            <Typography variant="h4" gutterBottom>
                Your Posts
            </Typography>
            {allPostsData.map(post =>
                <Post
                    key={uuidv4()}
                    post={post}
                />)}
            <Link to='post'>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        position: 'fixed',
                        bottom: '3em',
                        right: '3em',
                        height: '4em',
                    }}
                >
                    Write New Post
                </Button>
            </Link>
        </PostListComp>
    );
}

export default PostsList;