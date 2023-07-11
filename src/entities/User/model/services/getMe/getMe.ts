import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { User, userActions } from "@/entities/User"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const getMe = createAsyncThunk<User, undefined, ThunkConfig<string>>(
  "user/me",
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi
    console.log("getMe")

    try {
      const response = await extra.api.get<User>("users/me?populate=deep")

      if (!response.data) {
        throw new Error()
      }

      dispatch(userActions.setUserData(response.data))
      return response.data
    } catch (e) {
      toast.error("Error Fetching User Data")
      console.log(e)
      return rejectWithValue("error")
    }
  },
)
