import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getMe, UserSchema } from "../.."
import { JWT_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { User, UserResponse } from "../types/User.interface"
import { $api } from "@/shared/api/api"

const initialState: UserSchema = {
  _inited: false,
  authData: {
    jwt: null,
    user: null,
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<UserResponse>) => {
      state.authData.user = action.payload.user
      state.authData.jwt = action.payload.jwt
      $api.defaults.headers.authorization = `Bearer ${action.payload.jwt}`
    },

    setUserData: (state, action: PayloadAction<User>) => {
      state.authData.user = action.payload
    },

    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      const jwt = localStorage.getItem(JWT_LOCALSTORAGE_KEY)
      if (user && jwt) {
        state.authData.user = JSON.parse(user)
        state.authData.jwt = jwt
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData.user = null
      state.authData.jwt = null
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
      localStorage.removeItem(JWT_LOCALSTORAGE_KEY)
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
