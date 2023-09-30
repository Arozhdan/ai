import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"
import { ACTIVE_CHAT_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"

export const getActiveChat = (state: StateSchema) => {
  const activeChatId = localStorage.getItem(ACTIVE_CHAT_LOCALSTORAGE_KEY)
  if (!activeChatId) return null
  const activeChat = state.chat.chatList.find(chat => chat.id === Number(activeChatId))
  return activeChat || null
}
