import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getLoginIsLoading = (state: StateSchema) => state?.login?.isLoading || false
