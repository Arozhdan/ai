import { Chat } from "./Chat";

export interface ChatSchema {
  chatList: Chat[]
  chatListIsLoading: boolean
  chatListError: string | null
  selectedChat: Chat | null
  selectedChatIsLoading: boolean
  selectedChatError: string | null
}