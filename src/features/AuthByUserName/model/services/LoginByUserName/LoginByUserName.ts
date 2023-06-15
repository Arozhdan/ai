import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserResponse, userActions } from "@/entities/User"
import { JWT_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  UserResponse,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.post<UserResponse>("/auth/local", {
      identifier: authData.username,
      password: authData.password,
    })

    if (!response.data || !response.data.user) {
      throw new Error()
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.user))
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, response.data.jwt)
    dispatch(userActions.setAuthData(response.data))
    return response.data
  } catch (e) {
    console.log(e)
    return rejectWithValue("error")
  }
})
