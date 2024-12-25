import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [], 
    isLoading: false, 
    error: null,
};

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        signupSuccess: (state, action) => {
            const { id, ...rest } = action.payload;
            const user = {
                id, 
                ...rest,
            };
            state.users.push(user);
            state.isLoading = false;
        },
        signupFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;

export default signupSlice.reducer;
