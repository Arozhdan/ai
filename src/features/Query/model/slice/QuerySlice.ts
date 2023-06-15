import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { QuerySchema, QueryTab } from "../types/QuerySchema"
import { QueryRequest } from "../types/Query"
import { sendQuery } from "../services/sendQuery/sendQuery"
import { fetchQueries } from "../services/fetchQueries/fetchQueries"
import { ACTIVE_TAB_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { markSaved, markUnsaved } from "../services/markSavedUnsaved/markSavedUnsaved"

const initialState: QuerySchema = {
  isLoading: false,
  list: [],
  newQuery: null,
  activeItem: null,
  isLoadingList: false,
  errorList: null,
  error: null,
  tab: QueryTab.RELATED,
}

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setNewQuery: (state, action: PayloadAction<QueryRequest>) => {
      state.newQuery = action.payload
    },
    unsetNewQuery: (state) => {
      state.newQuery = null
    },
    setTab: (state, action: PayloadAction<QueryTab>) => {
      state.tab = action.payload
      localStorage.setItem(ACTIVE_TAB_LOCALSTORAGE_KEY, action.payload)
    },
    initTab: (state) => {
      const tab =
        (localStorage.getItem(ACTIVE_TAB_LOCALSTORAGE_KEY) as QueryTab) || QueryTab.RELATED
      state.tab = tab || QueryTab.RELATED
    },
    markStored(state, action: PayloadAction<{ id: number }>) {
      const query = state.list.find((item) => item.id === action.payload.id)
      if (query) {
        query.store = true
      }
    },
    markUnstored(state, action: PayloadAction<{ id: number }>) {
      const query = state.list.find((item) => item.id === action.payload.id)
      if (query) {
        query.store = false
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuery.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.isLoading = false
        state.list.unshift(action.payload)
        state.activeItem = action.payload
      })
      .addCase(sendQuery.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || null
        state.activeItem = null
      })
      .addCase(fetchQueries.pending, (state) => {
        state.isLoadingList = true
        state.errorList = null
      })
      .addCase(fetchQueries.fulfilled, (state, action) => {
        state.isLoadingList = false
        state.errorList = null
        state.list = action.payload
      })
      .addCase(fetchQueries.rejected, (state, action) => {
        state.isLoadingList = false
        state.errorList = action.payload || null
      })
      .addCase(markUnsaved.pending, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = false
        }
      })
      .addCase(markUnsaved.rejected, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = true
        }
      })
      .addCase(markUnsaved.fulfilled, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = false
        }
      })
      .addCase(markSaved.pending, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = true
        }
      })
      .addCase(markSaved.rejected, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = false
        }
      })
      .addCase(markSaved.fulfilled, (state, action) => {
        const query = state.list.find((item) => item.id === action.meta.arg.queryId)
        if (query) {
          query.store = true
        }
      })
  },
})

export const { actions: queryActions } = querySlice
export const { reducer: queryReducer } = querySlice
