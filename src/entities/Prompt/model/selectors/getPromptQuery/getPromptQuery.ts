import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getPromptQuery = (state: StateSchema) => state.prompt.promptsListQuery
