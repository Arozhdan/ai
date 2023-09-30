import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Chat } from "../../types/Chat"
import { chatActions } from "../../slice/ChatSlice"



export const createNewChat = createAsyncThunk<
  Chat,
  undefined,
  ThunkConfig<string>
>("chat/createNew", async (_props, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<{ data: Chat }>("/chat-new")

    if (!response.data) {
      throw new Error()
    }

    dispatch(chatActions.addChat(response.data.data))
    return response.data.data
  } catch (e) {
    console.log(e)
    return rejectWithValue("error")
  }
})
