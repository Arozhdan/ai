import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserResponse, userActions } from "@/entities/User"
import { JWT_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { $api } from "@/shared/api/api"
import { toast } from "react-toastify"

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  UserResponse,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    console.log("loginByUsername")
    console.log({
      identifier: authData.username,
      password: authData.password,
    })

    const response = await extra.api.post<UserResponse>("/auth/local", {
      identifier: authData.username,
      password: authData.password,
    })

    if (!response.data || !response.data.user) {
      throw new Error()
    }

    console.log("loginByUsername response")
    console.log(response)

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.user))
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, response.data.jwt)
    $api.defaults.headers.common["Authorization"] = `Bearer ${response.data.jwt}`

    return response.data
  } catch (e) {
    toast.error("Error logging in")
    console.log(e)
    return rejectWithValue("error")
  }
})
