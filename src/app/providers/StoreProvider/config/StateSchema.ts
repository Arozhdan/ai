import {
  type AnyAction,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
} from "@reduxjs/toolkit"
import { type NavigateOptions, type To } from "react-router-dom"
import { type AxiosInstance } from "axios"
import { type CombinedState } from "redux"
import { type UserSchema } from "@/entities/User"
import { LoginSchema } from "@/features/AuthByUserName"
import { PromptSchema } from "@/entities/Prompt"
import { LayoutSchema } from "@/widget/Layout"
import { QuerySchema } from "@/features/Query"
import { RegisterSchema } from "@/features/RegisterLocal"
import { SubscriptionSchema } from "@/entities/Subscribtion"
import { ChatSchema } from "@/entities/Chat"

export interface StateSchema {
  user: UserSchema
  login: LoginSchema
  prompt: PromptSchema
  layout: LayoutSchema
  query: QuerySchema
  register: RegisterSchema
  subscription: SubscriptionSchema
  chat: ChatSchema
}
export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
