import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { To } from "history"
import { NavigateOptions } from "react-router"
import { CombinedState, Reducer } from "redux"
import { StateSchema, ThunkExtraArg } from "./StateSchema"
import { userReducer } from "@/entities/User"
import { createReducerManager } from "./reducerManager"
import { $api } from "@/shared/api/api"
import { loginReducer } from "@/features/AuthByUserName/model/slice/loginSlice"
import { promptReducer } from "@/entities/Prompt"
import { layoutReducer } from "@/widget/Layout"
import { queryReducer } from "@/features/Query/model/slice/QuerySlice"
import { registerReducer } from "@/features/RegisterLocal"
import { subscriptionReducer } from "@/entities/Subscribtion"
import { chatReducer } from "@/entities/Chat"

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    login: loginReducer,
    prompt: promptReducer,
    layout: layoutReducer,
    query: queryReducer,
    register: registerReducer,
    subscription: subscriptionReducer,
    chat: chatReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
