import { createSlice } from "@reduxjs/toolkit";
import { post, localPost } from "../types";

const initialState: post[] = []

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addAll(state, action: { payload: post[] }) {
            return action.payload
        },
        addPost(state, action: { payload: post | localPost}) {
            return [action.payload, ...state]
        },
        deletePost_store(state, action: { payload: string }) {
            return state.filter(post => post.id !== action.payload)
        },
        editPost_store(state: post[], action: { payload: { id: string | undefined, text: string } }) {
            const { id, text } = action.payload
            const index = state.findIndex(post => post.id === id)
            state[index].text = text
        }
    }
})

export const allPosts = (state: { posts: post[] }) => state.posts

export const { addPost, deletePost_store, editPost_store, addAll } = postsSlice.actions;

export default postsSlice.reducer;