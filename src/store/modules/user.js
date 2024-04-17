// state management related to the user

import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken, request } from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'


const userStore = createSlice({
    name: "user",
    // data state declaration
    initialState: {
        token: getToken() || '', // 此处的初始值由后端返回值的格式决定，后端将返回String，所以此处是空串
        userInfo: {}
    },
    // Synchronous edit-method
    reducers: {
        setToken(state, action) {
            state.token = action.payload   // 从states中获取token数据，从action中的载荷做一个赋值  
            _setToken(action.payload)
            // localstorage
            localStorage.setItem('token_key', action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }

})

// Deconstruct actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// get reducer-function
const userReducer = userStore.reducer

// asynchronous method - for gtting token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1. send async request
        const res = await loginAPI(loginForm)
        // 2. submit sync action for storing token
        dispatch(setToken(res.data.token))
    }
}

// asynchronous method - get personal infomation
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer