import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Query, QueryRequest } from "../../types/Query"
import { queryActions } from "../../slice/QuerySlice"
import { userActions } from "@/entities/User"

export const sendQuery = createAsyncThunk<Query, QueryRequest, ThunkConfig<string>>(
  "query/sendQuery",
  async (query, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi
    console.log("query", query)

    try {
      const response = await extra.api.post<{ data: Query }>("/query", {
        input: query.input,
        query: query.query,
        relatedPrompt: query.relatedPrompt,
        title: query.title,
        lang: query.lang,
      })

      if (!response.data || !response.data.data) {
        throw new Error()
      }
      dispatch(queryActions.unsetNewQuery())
      dispatch(userActions.increaseCurrentUsage())
      return response.data.data
    } catch (e: any) {
      console.log("e", e)
      const message =
        e.response?.data?.error?.details || "Упс, что-то пошло не так. Попробуйте еще раз."
      return rejectWithValue(message)
    }
  },
)
