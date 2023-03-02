import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from '../api/user'
import axios from 'axios'
import { user } from "../types";

const options = {
    headers: {
        'app-id': '63fa16ae66116546858aada4'
    }
};

const BASE_URL = 'https://dummyapi.io/data/v1'

export const createUserThunk = createAsyncThunk("user/createUser", async (user: user) => {
    const res = await axios.post(`${BASE_URL}/user/create`, user, options)
    return res.data;
});

export const getUserDetailsThunk = createAsyncThunk("user/getUserDetailsThunk", async (id: string) => {
    const res = await axios.get(`${BASE_URL}/user/${id}`, options)
    return res.data
});

type stateType = {
    user: user,
    status: string,
    error: string | undefined
}

const initialState: stateType = {
    user: {
        email: "berioo20003@gmail.com",
        firstName: "Yosef",
        id: "63fb2d871f4ca39432fd455a",
        lastName: "Hershberg",
        registerDate: "2023-02-26T09:59:35.268Z",
        updatedDate: "2023-02-26T09:59:35.268Z",
    },
    status: 'idle',
    error: undefined,
}

const userSlice = createSlice({
    name: 'uesr',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUserThunk.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createUserThunk.fulfilled, (state, action: { payload: user }) => {
                return { ...state, user: action.payload, status: "succeeded" }
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getUserDetailsThunk.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUserDetailsThunk.fulfilled, (state, action: { payload: user }) => {
                // state.status = "succeeded";
                return { ...state, user: action.payload, status: "succeeded" }
            })
            .addCase(getUserDetailsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const currentUser = (state: { user: stateType }) => state.user.user
export const userStatus = (state: { user: stateType }) => state.user.status

export const { setUser } = userSlice.actions

export default userSlice.reducer