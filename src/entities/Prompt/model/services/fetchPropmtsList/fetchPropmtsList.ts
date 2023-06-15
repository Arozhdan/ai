import { createAsyncThunk } from "@reduxjs/toolkit"
import { Prompt, PromptsResponse } from "../../types/Prompt"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { promptActions } from "../../slice/PromptSlice"

interface GetPromptsListProps {
  page?: number
  pageSize?: number
}

export const fetchPromptsList = createAsyncThunk<
  Prompt[],
  GetPromptsListProps,
  ThunkConfig<string>
>("prompt/getPormptsList", async (_props, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<PromptsResponse>("/prompts")

    if (!response.data) {
      throw new Error()
    }

    dispatch(promptActions.setPromptsList(response.data.data))
    return response.data.data
  } catch (e) {
    console.log(e)
    return rejectWithValue("error")
  }
})
