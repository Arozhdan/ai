import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatSchema } from "../types/ChatSchema"
import { Chat } from "../types/Chat"
import { ACTIVE_CHAT_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { createNewChat } from "../services/createNewChat/createNewChat"
import { newMessage, renameChat } from "../.."
import { toast } from "react-toastify"
import { deleteChat } from "../services/deleteChat/deleteChat"

const initialState: ChatSchema = {
  chatList: [],
  chatListIsLoading: false,
  chatListError: null,
  selectedChat: null,
  selectedChatIsLoading: false,
  selectedChatError: null,
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
    renameChat: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const chatIndex = state.chatList.findIndex((chat) => chat.id === action.payload.id)
      if (chatIndex === -1) return
      state.chatList[chatIndex].name = action.payload.name
    },
    deleteChat: (state, action: PayloadAction<number>) => {
      state.chatList = state.chatList.filter((chat) => chat.id !== action.payload)
      localStorage.removeItem(ACTIVE_CHAT_LOCALSTORAGE_KEY)
    },
    setFirstChatAsActive: (state) => {
      if (!state.chatList.length) return
      state.selectedChat = state.chatList[0]
      localStorage.setItem(ACTIVE_CHAT_LOCALSTORAGE_KEY, JSON.stringify(state.chatList[0].id))
    },
    setChatListIsLoading: (state, action: PayloadAction<boolean>) => {
      state.chatListIsLoading = action.payload
    },
    setChatListError: (state, action: PayloadAction<string | null>) => {
      state.chatListError = action.payload
    },
    setSelectedChat: (state, action: PayloadAction<{ id: number } | null>) => {
      state.selectedChat = state.chatList.find((chat) => chat.id === action.payload?.id) || null
      if (!action.payload?.id) return localStorage.removeItem(ACTIVE_CHAT_LOCALSTORAGE_KEY)
      localStorage.setItem(ACTIVE_CHAT_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id))
    },
    setSelectedChatIsLoading: (state, action: PayloadAction<boolean>) => {
      state.selectedChatIsLoading = action.payload
    },
    setSelectedChatError: (state, action: PayloadAction<string | null>) => {
      state.selectedChatError = action.payload
    },
    addMessage: (
      state,
      action: PayloadAction<{
        chatId: number
        message: string
        role: "user" | "assistant"
      }>,
    ) => {
      const chatIndex = state.chatList.findIndex((chat) => chat.id === action.payload.chatId)
      if (chatIndex === -1) return
      state.chatList[chatIndex].messages.push({
        role: action.payload.role,
        content: action.payload.message,
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChat.pending, (state) => {
        state.selectedChatError = null
        state.selectedChatIsLoading = true
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        console.log(action.payload)

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
      .addCase(renameChat.rejected, (state, action) => {
        state.selectedChatError = action.payload as string
        toast.error(action.payload)
      })
  },
})
export const { actions: chatActions } = chatSlice
export const { reducer: chatReducer } = chatSlice
