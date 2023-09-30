import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatSchema } from "../types/ChatSchema"
import { Chat } from "../types/Chat"
import { ACTIVE_CHAT_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { createNewChat } from "../services/createNewChat/createNewChat"
import { newMessage } from "../.."
import { toast } from "react-toastify"

const initialState: ChatSchema = {
  chatList: [],
  chatListIsLoading: false,
  chatListError: null,
  selectedChat: null,
  selectedChatIsLoading: false,
  selectedChatError: null
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<Chat[]>) => {
      state.chatList = action.payload
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chatList.unshift(action.payload)
      localStorage.setItem(ACTIVE_CHAT_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id))
    },
    setChatListIsLoading: (state, action: PayloadAction<boolean>) => {
      state.chatListIsLoading = action.payload
    },
    setChatListError: (state, action: PayloadAction<string | null>) => {
      state.chatListError = action.payload
    },
    setSelectedChat: (state, action: PayloadAction<{ id: number } | null>) => {
      state.selectedChat = state.chatList.find(chat => chat.id === action.payload?.id) || null
      if (!action.payload?.id) return localStorage.removeItem(ACTIVE_CHAT_LOCALSTORAGE_KEY)
      localStorage.setItem(ACTIVE_CHAT_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id))
    },
    setSelectedChatIsLoading: (state, action: PayloadAction<boolean>) => {
      state.selectedChatIsLoading = action.payload
    },
    setSelectedChatError: (state, action: PayloadAction<string | null>) => {
      state.selectedChatError = action.payload
    },
    addMessage: (state, action: PayloadAction<{
      chatId: number
      message: string
      role: "user" | "assistant"
    }>) => {
      const chatIndex = state.chatList.findIndex(chat => chat.id === action.payload.chatId)
      if (chatIndex === -1) return
      state.chatList[chatIndex].messages.push({
        role: action.payload.role,
        content: action.payload.message,
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChat.pending, (state) => {
        state.selectedChatError = null
        state.selectedChatIsLoading = true
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        console.log(action.payload);

        state.selectedChatIsLoading = false
        state.selectedChat = action.payload
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.selectedChatIsLoading = false
        state.selectedChatError = action.payload as string
      })
      .addCase(newMessage.pending, (state) => {
        state.selectedChatError = null
        state.selectedChatIsLoading = true
      })
      .addCase(newMessage.fulfilled, (state) => {
        state.selectedChatIsLoading = false
      })
      .addCase(newMessage.rejected, (state, action) => {
        state.selectedChatIsLoading = false
        state.selectedChatError = action.payload as string
        toast.error(action.payload)
      })
  },
})
export const { actions: chatActions } = chatSlice
export const { reducer: chatReducer } = chatSlice
