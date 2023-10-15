import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { toast } from "react-toastify"
import { UserResponse } from "@/entities/User"

interface ResetPasswordProps {
  password: string
  code: string
}

export const resetPassword = createAsyncThunk<
  UserResponse,
  ResetPasswordProps,
  ThunkConfig<string>
>("auth/ResetPassword", async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi
  try {
    const response = await extra.api.post<UserResponse>("/auth/reset-password", {
      password: authData.password,
      passwordConfirmation: authData.password,
      code: authData.code,
    })

    if (!response.data || !response.data.user) {
      throw new Error()
    }
    toast.success("Пароль успешно изменен")

    const navigate = extra.navigate
    if (navigate) {
      navigate("/login")
    }

    return response.data
  } catch (e: any) {
    const errorMessages = e.response?.data?.error?.details || "Ошибка сброса пароля"
    toast.error(errorMessages)
    console.log(e)
    return rejectWithValue(errorMessages)
  }
})
