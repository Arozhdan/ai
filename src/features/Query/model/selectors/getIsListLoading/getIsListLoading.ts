import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getIsListLoading = (state: StateSchema) => state.query.isLoadingList
