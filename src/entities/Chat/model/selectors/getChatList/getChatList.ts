import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getChatList = (state: StateSchema) => state.chat.chatList
