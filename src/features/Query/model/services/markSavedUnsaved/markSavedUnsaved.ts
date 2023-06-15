import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { toast } from "react-toastify"

interface Params {
  queryId: number
}

export const markSaved = createAsyncThunk<undefined, Params, ThunkConfig<string>>(
  "query/saveQuery",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi
    try {
      const { queryId } = params
      await extra.api.post("/query-save", { queryId })
      toast.success("Query saved")
    } catch (e) {
      toast.error("Error saving query")
      return rejectWithValue("error")
    }
  },
)

export const markUnsaved = createAsyncThunk<undefined, Params, ThunkConfig<string>>(
  "query/unsaveQuery",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi
    try {
      const { queryId } = params
      await extra.api.post("/query-unsave", { queryId })
      toast.success("Query unsaved")
    } catch (e) {
      toast.error("Error unsaving query")
      return rejectWithValue("error")
    }
  },
)
