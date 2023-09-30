export interface Chat {
  id: number
  createdAt: string
  updatedAt: string
  messages: Message[]
  name?: string
}

export interface Message {
  role: "user" | "assistant"
  content: string
}
