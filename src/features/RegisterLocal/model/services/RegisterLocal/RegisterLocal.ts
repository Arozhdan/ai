import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserResponse } from "@/entities/User"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { toast } from "react-toastify"

interface RegisterLocalProps {
  username: string
  password: string
  email: string
}

export const regiserLocal = createAsyncThunk<UserResponse, RegisterLocalProps, ThunkConfig<string>>(
  "register/registerLocal",
  async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.post<UserResponse>("/auth/local/register", {
        username: authData.username,
        email: authData.email,
        password: authData.password,
      })

      if (!response.data || !response.data.user) {
        throw new Error()
      }

      return response.data
    } catch (e: any) {
      const errorMessages = e.response?.data?.error?.details || "Ошибка регистрации. Попробуйте еще раз."
      toast.error(errorMessages)
      console.log(e)
      return rejectWithValue(errorMessages)
    }
  },
)
