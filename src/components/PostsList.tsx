import React, { useState, useEffect, useContext } from 'react';
import { PostsCotext } from './UserWorkSpace';
import { useQueryClient, useQuery } from "@tanstack/react-query"
import Post from './Post'
import { allPosts } from '../state/postsSlice'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function PostsList() {
    const allPostsData = useSelector(allPosts)
    const postsQuery = useContext(PostsCotext)
    const [listContent, setListContent] = useState()

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
        <>
            <div id="post-list">
                <h3>Your Posts</h3>
                {allPostsData.map(post =>
                    <Post
                        key={uuidv4()}
                        post={post}
                    />)}
            </div>
        </>
    );
}

export default PostsList;