import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Query } from "../../types/Query"

export const fetchQueries = createAsyncThunk<Query[], undefined, ThunkConfig<string>>(
  "query/fetchQueries",
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.get<{ data: Query[] }>("/query")

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
