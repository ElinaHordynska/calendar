import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null
}

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    uploadTokenFromLocalStorage: (state) => {
        state.token = localStorage.getItem("token") || null
    },
    setToken: (state, action) => {
        state.token = action.payload
        localStorage.setItem("token", action.payload)
    },
    removeToken: (state) => {
        state.token = null
        localStorage.removeItem("token")
    }
  }
});

export const {uploadTokenFromLocalStorage, removeToken, setToken} = AuthReducer.actions

export default AuthReducer.reducer