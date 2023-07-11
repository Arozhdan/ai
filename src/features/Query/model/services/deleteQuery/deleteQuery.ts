import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Query } from "../../types/Query"

export const deleteQuery = createAsyncThunk<Omit<Query, "user">, number, ThunkConfig<string>>(
  "query/deleteQuery",
  async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.delete<{ data: Omit<Query, "user"> }>(`/queries/${id}`)

      if (!response.data || !response.data.data) {
        throw new Error()
      }

      return response.data.data
    } catch (e) {
      console.log(e)
      return rejectWithValue("error")
    }
  },
)