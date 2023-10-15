export interface PromptsResponse {
  data: Prompt[]
}

export const enum PromtIcons {
  PENCIL = "pencil",
  BOOK = "book",
  ENVELOPE = "envelope",
  USERS = "users",
  STORE = "store",
  DOCUMENT = "document",
}

export interface Prompt {
  id: 1
  attributes: {
    name: string
    prompt: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    helpText: string
    description: string
    slug: string
    id?: number
    example?: string
    icon?: PromtIcons
  }
}
