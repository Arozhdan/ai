import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { toast } from "react-toastify"

interface ForgotPasswordRequestProps {
  email: string
}

export const forgotPasswordRequest = createAsyncThunk<
  { ok: boolean },
  ForgotPasswordRequestProps,
  ThunkConfig<string>
>("auth/ForgotPasswordRequest", async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi
  toast.info("Отправка запроса на восстановление пароля")
  try {
    const response = await extra.api.post<{
      ok: boolean
    }>("/auth/forgot-password", {
      email: authData.email,
    })

    if (!response.data || !response.data.ok) {
      throw new Error()
    }
    toast.success("Ссылка для восстановления пароля отправлена на вашу почту")
    console.log(response)

    return response.data
  } catch (e: any) {
    const errorMessages =
      e.response?.data?.error?.details || "Ошибка авторизации. Попробуйте еще раз."
    toast.error(errorMessages)
    console.log(e)
    return rejectWithValue(errorMessages)
  }
})
