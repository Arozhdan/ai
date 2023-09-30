import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { chatActions } from "../../slice/ChatSlice"

interface CreateNewChatProps {
  message: string
  chatId: number
}
// {
//   "data": [
//     {
//       "role": "assistant",
//       "content": "Практикуйся, пиши код и используй онлайн-ресурсы для изучения программирования. Удачи!"
//     }
//   ]
// }

interface CreateNewChatResponse {
  data: {
    role: "assistant" | "user"
    content: string
  }[]
}

export const newMessage = createAsyncThunk<
  null,
  CreateNewChatProps,
  ThunkConfig<string>
>("chat/newMessage", async ({ chatId, message }, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {

    dispatch(chatActions.addMessage({
      chatId,
      message,
      role: "user"
    }))

    const response = await extra.api.post<
      CreateNewChatResponse
    >("/chat-message", {
      message,
      chatId
    })

    if (!response.data) {
      throw new Error()
    }

    dispatch(chatActions.addMessage({
      chatId,
      message: response.data.data[0].content,
      role: "assistant"
    }))
    return null

  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.error?.details || e.message
    return rejectWithValue(errorMessage)
  }
})
