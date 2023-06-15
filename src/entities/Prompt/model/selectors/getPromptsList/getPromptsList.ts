import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getPromptsList = (state: StateSchema) => state.prompt.promptsList
