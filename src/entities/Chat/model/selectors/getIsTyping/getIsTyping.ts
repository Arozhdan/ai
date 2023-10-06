import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getIsTyping = (state: StateSchema) => state.chat.selectedChatIsLoading
