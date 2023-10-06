import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { Chat } from "../../types/Chat"
import { chatActions } from "../../slice/ChatSlice"
import { createNewChat } from "../createNewChat/createNewChat"

export const fetchChatList = createAsyncThunk<Chat[], undefined, ThunkConfig<string>>(
  "chat/getChatList",
  async (_props, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.get<{ data: Chat[] }>("/chat-message")

      if (!response.data) {
        throw new Error()
      }
      dispatch(chatActions.setChatList(response.data.data))

      if (!response.data.data.length) {
        dispatch(createNewChat())
      }

      return response.data.data
    } catch (e) {
      console.log(e)
      return rejectWithValue("error")
    }
  },
)
