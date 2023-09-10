import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getIsRegisterLoading = (state: StateSchema): boolean => state.register.isLoading