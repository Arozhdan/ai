import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { chatActions, fetchChatList } from "@/entities/Chat"
import { toast } from "react-toastify"

export const renameChat = createAsyncThunk<
  null,
  {
    chatId: number
    chatName: string
  },
  ThunkConfig<string>
>("chat/rename", async ({ chatId, chatName }, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi
  try {
    dispatch(chatActions.renameChat({ id: chatId, name: chatName }))

    const response = await extra.api.post("/chat-rename", {
      chatId,
      chatName,
    })

    if (response.status !== 200) throw new Error("Ошибка сервера")
    toast.success("Успешно переименовано")
    return null
  } catch (e) {
    console.log(e)
    dispatch(fetchChatList())
    return rejectWithValue("Ошибка сервера")
  }
})
