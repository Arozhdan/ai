import { Prompt } from "@/entities/Prompt"
import { User } from "@/entities/User"

export interface Query {
  id?: number
  title: string
  result: string
  createdAt: string
  updatedAt: string
  store: boolean
  user: User
  prompt: Prompt["attributes"]
  input: string
  tov: string
  lang: string
}

export interface QueryRequest {
  relatedPrompt: number
  query: string
  input: string
  tov: {
    label: string
    value: string
  }
  lang: {
    label: string
    value: string
  }
  title: string
}
