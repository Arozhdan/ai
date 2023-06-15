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
}

export interface UserSchema {
  authData: {
    jwt: string | null
    user: User | null
  }
  jwt?: string
  _inited: boolean
}
