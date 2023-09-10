import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegisterSchema } from "../types/registerSchema"
import { regiserLocal } from "../services/RegisterLocal/RegisterLocal"

const initialState: RegisterSchema = {
  isLoading: false,
  email: "",
  username: "",
  password: "",
}

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regiserLocal.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(regiserLocal.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(regiserLocal.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: registerActions } = registerSlice
export const { reducer: registerReducer } = registerSlice
