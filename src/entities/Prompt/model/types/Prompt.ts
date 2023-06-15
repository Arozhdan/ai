export interface PromptsResponse {
  data: Prompt[]
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
  }
}
