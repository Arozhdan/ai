import { Query, QueryRequest } from "./Query"

export enum QueryTab {
  RELATED = "related",
  HISTORY = "history",
  SAVED = "saved",
}

export interface QuerySchema {
  isLoading: boolean
  isLoadingList: boolean
  error: string | null
  errorList: string | null
  list: Query[]
  newQuery: QueryRequest | null
  activeItem: Query | null
  tab: QueryTab
}
