import { Prompt } from "./Prompt"

export interface PromptSchema {
  promptsList: Prompt[] | null
  promptsListQuery: string | null
  isLoadingList: boolean
  errorList: string | null
  selectedPrompt: Prompt | null
  isLoadingSelected: boolean
  errorSelected: string | null
}
