import {createSlice} from '@reduxjs/toolkit';
        
const initialState={
    userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null ,
    isAdminAuthenticated:localStorage.getItem('isAdminAuthenticated')? JSON.parse(localStorage.getItem('isAdminAuthenticated')):null
} 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
        setAdminAuth: (state) => {
            state.isAdminAuthenticated = true;
            localStorage.setItem("isAdminAuthenticated", JSON.stringify(state.isAdminAuthenticated));
        },
        logoutAdmin:(state)=>{
            state.isAdminAuthenticated=false
            localStorage.removeItem("isAdminAuthenticated");
        }
    },
});

export const { setCredentials, logout, setAdminAuth, logoutAdmin } = authSlice.actions;

export default authSlice.reducer;