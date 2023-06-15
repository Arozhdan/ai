import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PromptSchema } from "../types/PromptSchema"
import { Prompt } from "../.."
import { fetchPromptsList } from "../services/fetchPropmtsList/fetchPropmtsList"

const initialState: PromptSchema = {
  promptsList: null,
  promptsListQuery: null,
  isLoadingList: false,
  errorList: null,
  selectedPrompt: null,
  isLoadingSelected: false,
  errorSelected: null,
}

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPromptsList: (state, action: PayloadAction<Prompt[]>) => {
      state.promptsList = action.payload
    },
    setPromptsListQuery: (state, action: PayloadAction<string>) => {
      state.promptsListQuery = action.payload
    },
    setSelectedPrompt: (state, action: PayloadAction<Prompt>) => {
      state.selectedPrompt = action.payload
    },
    setSelectedPromptBySlug: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) return

      if (!state.promptsList?.length) return
      const prompt = state.promptsList.find((prompt) => prompt.attributes.slug === action.payload)

      if (prompt) state.selectedPrompt = prompt
    },
    unsetSelectedPrompt: (state) => {
      state.selectedPrompt = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromptsList.pending, (state) => {
        state.errorList = null
        state.isLoadingList = true
      })
      .addCase(fetchPromptsList.fulfilled, (state) => {
        state.isLoadingList = false
      })
      .addCase(fetchPromptsList.rejected, (state, action) => {
        state.isLoadingList = false
        state.errorList = action.payload as string
      })
  },
})

export const { actions: promptActions } = promptSlice
export const { reducer: promptReducer } = promptSlice
