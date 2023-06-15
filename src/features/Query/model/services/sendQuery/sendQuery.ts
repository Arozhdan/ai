import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Query, QueryRequest } from "../../types/Query"
import { queryActions } from "../../slice/QuerySlice"

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
        tov: query.tov,
        lang: query.lang,
      })

      if (!response.data || !response.data.data) {
        throw new Error()
      }
      dispatch(queryActions.unsetNewQuery())
      return response.data.data
    } catch (e) {
      console.log(e)
      return rejectWithValue("error")
    }
  },
)
