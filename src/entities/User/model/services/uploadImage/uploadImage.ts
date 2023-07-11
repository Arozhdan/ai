import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { User, userActions } from "@/entities/User"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const uploadImage = createAsyncThunk<User, File, ThunkConfig<string>>(
  "user/uploadImage",
  async (file, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi
    console.log("getMe")

    try {
      const response = await extra.api.post<User>("user/uploadUserImage", {
        file,
      })

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
