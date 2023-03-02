import React, { useState, useEffect, createContext, useContext } from 'react';
import { getUserPosts } from '../api/posts'
import { useParams, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueries, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import PostsList from './PostsList'
import WritePost from './WritePost';
import EditPost from './EditPost';
import { addAll } from '../state/postsSlice'
import { useDispatch } from 'react-redux';
import { AppContext } from '../App'
import { post } from '../types';

export const PostsCotext = createContext<post[] | any>([])
// export const PostsCotext = createContext<any>({});

const options = {
    headers: {
        'app-id': '63fa16ae66116546858aada4'
    }
};

const BASE_URL = 'https://dummyapi.io/data/v1'

function UserWorkSpace() {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const { setIsFetching } = useContext(AppContext)

    // const userQuery = useQuery({
    //     queryKey: ['userDetails'],
    //     enabled: true,
    //     queryFn: () => getUserDetails(id),
    // })

    const postsQuery = useQuery<post[]>({
        queryKey: ['posts'],
        enabled: true,
        queryFn: () => getUserPosts(id),
        onSuccess: data => dispatch(addAll(data))
        // placeholderData: [{ some data }]
    })

    useEffect(() => {
        const { isFetching, isFetched } = postsQuery
        isFetching && setIsFetching(isFetching)
        isFetched && setIsFetching(isFetching)
    }, [postsQuery]);

    // THIS is for get multibleQueries at once 
    //-----------------------------------
    // const queries = useQueries({
    //     queries: (postsQuery?.data ?? []).map(post => {
    //         return {
    //             queryKey: ['posts', post.id],
    //             queryFn: () => getUserPosts(post.id)
    //         }
    //     })
    // })


    //prefetchingData
    //--------------------------
    // function onHover() {
    //     queryClient.prefetchQuery({
    //         queryKey: ['posts'],
    //         queryFn: getData()
    //     })
    // }

    return (
        <PostsCotext.Provider value={postsQuery}>
            <Routes>
                <Route path='/' element={<PostsList />} />
                <Route path='post' element={<WritePost
                // user={userQuery}
                />} />
                <Route path='edit/:id' element={<EditPost
                // user={userQuery}
                />} />
            </Routes>
        </PostsCotext.Provider>
    );
}

export default UserWorkSpace;