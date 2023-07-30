import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { User, userActions } from "@/entities/User"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const getMe = createAsyncThunk<User, undefined, ThunkConfig<string>>(
  "user/me",
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi
    dispatch(userActions.setIsUserDataLoading(true))

    try {
      const response = await extra.api.get<User>("users/me?populate=deep")

      if (!response.data) {
        throw new Error()
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setUserData(response.data))

      dispatch(userActions.setIsUserDataLoading(false))

      return response.data
    } catch (e) {
      toast.error("Error Fetching User Data")
      console.log(e)
      dispatch(userActions.setIsUserDataLoading(false))
      return rejectWithValue("error")
    }
  },
)
