import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getCollapsed = (state: StateSchema) => state?.layout.isCollapsed
