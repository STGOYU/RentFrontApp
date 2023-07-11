import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers:{
        loginSucces:(state, action)=> {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        loginFailure:(state)=> {
            //clear the token and redirect to home page or show error message etc...
            state.isLoggedIn= false;
            state.user = {};
        },
        logout: (state)=> {
            state.isLoggedIn= false;
            state.user = {};
        }
    }
});

export const {loginSucces, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;