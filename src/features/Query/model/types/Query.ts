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
  tov: "PROFESSIONAL" | "CASUAL" | "FRIENDLY" | "FAMILIAR" | "INTIMATE" | "OTHER"
  lang: "ENGLISH" | "RUSSIAN"
}

export interface QueryRequest {
  relatedPrompt: number
  query: string
  input: string
  tov: "PROFESSIONAL" | "CASUAL" | "FRIENDLY" | "FAMILIAR" | "INTIMATE" | "OTHER"
  lang: "ENGLISH" | "RUSSIAN"
  title: string
}
