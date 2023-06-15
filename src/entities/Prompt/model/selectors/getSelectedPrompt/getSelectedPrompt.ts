import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getSelectedPrompt = (state: StateSchema) => state.prompt.selectedPrompt
