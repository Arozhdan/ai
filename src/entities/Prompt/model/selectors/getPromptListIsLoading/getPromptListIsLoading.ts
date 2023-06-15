import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getPromptsListIsLoading = (state: StateSchema) => state.prompt.isLoadingList
