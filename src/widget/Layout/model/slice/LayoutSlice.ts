import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LayoutSchema } from "../types/LayoutSchema"
import { SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"

const initialState: LayoutSchema = {
  isCollapsed: false,
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
      localStorage.setItem(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY, JSON.stringify(action.payload))
    },
    initLayout: (state) => {
      const isCollapsed = JSON.parse(
        localStorage.getItem(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY) || "false",
      )
      if (isCollapsed !== state.isCollapsed) {
        state.isCollapsed = JSON.parse(isCollapsed)
      }
    },
  },
})

export const { actions: layoutActions } = layoutSlice
export const { reducer: layoutReducer } = layoutSlice
