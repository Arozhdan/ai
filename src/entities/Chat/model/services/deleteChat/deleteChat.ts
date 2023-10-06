import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { chatActions } from "@/entities/Chat"

export const deleteChat = createAsyncThunk<null, number, ThunkConfig<string>>(
  "chat/delete",
  async (chatId, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi
    console.log("deleteChat", chatId)

    try {
      const response = await extra.api.post("/chat-delete", {
        chatId,
      })
      dispatch(chatActions.deleteChat(chatId))
      dispatch(chatActions.setFirstChatAsActive())

      if (response.status !== 200) throw new Error("Ошибка сервера")
      return null
    } catch (e) {
      console.log(e)
      return rejectWithValue("error")
    }
  },
)
