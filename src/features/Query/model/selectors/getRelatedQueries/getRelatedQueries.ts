import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"
import { QueryTab } from "../../types/QuerySchema"

export const getRelatedQueries = (state: StateSchema, promptId?: number) => {
  if (!promptId) return state.query.list
  const activeTab = state.query.tab
  if (activeTab === QueryTab.RELATED) {
    return state.query.list.filter((query) => query.prompt?.id === promptId)
  }
  if (activeTab === QueryTab.SAVED) {
    return state.query.list.filter((query) => query.store)
  }
  return state.query.list
}
