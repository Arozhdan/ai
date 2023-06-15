import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getActiveTab = (state: StateSchema) => state.query.tab
