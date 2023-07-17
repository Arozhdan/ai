import { Prompt } from "@/entities/Prompt"

export interface UserResponse {
  jwt: string
  user: User
}

export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  image?: {
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    provider: string
    createdAt: string
    updatedAt: string
  }
  favPrompts: Prompt["attributes"][]
}

export interface Formats {
  thumbnail: Media
  medium: Media
  small: Media
}

export interface Media {
  name: string
  hash: string
  ext: string
  mime: string
  path?: string
  width: number
  height: number
  size: number
  url: string
}

export interface UserSchema {
  authData: {
    jwt: string | null
    user: User | null
  }
  jwt?: string
  _inited: boolean
  isLoading: boolean
}
