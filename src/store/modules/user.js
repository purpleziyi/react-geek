// state management related to the user

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";


const userStore = createSlice({
    name: "user",
    // data state declaration
    initialState: {
        token: localStorage.getItem('token_key') || ''  // 此处的初始值由后端返回值的格式决定，后端将返回String，所以此处是空串

    },
    // Synchronous edit-method
    reducers: {
        setToken(state, action) {
            state.token = action.payload   // 从states中获取token数据，从action中的载荷做一个赋值  
            // localstorage
            localStorage.setItem('token_key', action.payload)
        }
    }

})

// Deconstruct actionCreator
const { setToken } = userStore.actions

// get reducer-function
const userReducer = userStore.reducer

// asynchronous method - for gtting token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1. send async request
        const res = await request.post('/authorizations', loginForm)
        // 2. submit sync action for storing token
        dispatch(setToken(res.data.token))
    }
}

export { setToken, fetchLogin }
export default userReducer