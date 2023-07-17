import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getIsUserLoading = (state: StateSchema) => state.user.isLoading
