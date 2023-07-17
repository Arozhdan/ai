import { About } from "@/pages/About"
import { Login, Signup } from "@/pages/Auth"
import { Favorites } from "@/pages/Favorites"
import { History } from "@/pages/History"
import { Main } from "@/pages/Main"
import { Profile } from "@/pages/Profile"
import { Prompt } from "@/pages/Prompt"
import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  HISTORY = "history",
  FAVORITES = "favorites",
  LOGIN = "login",
  PROFILE = "profile",
  SIGNUP = "signup",
  PROMPT = "prompt/:slug",
  // last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.HISTORY]: "/history",
  [AppRoutes.FAVORITES]: "/favorites",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.SIGNUP]: "/signup",
  [AppRoutes.PROMPT]: "/prompts/:slug",
  // последний
  [AppRoutes.NOT_FOUND]: "*",
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    authOnly: true,
    element: <Main />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    authOnly: true,
    element: <About />,
  },
  [AppRoutes.HISTORY]: {
    path: RoutePath.history,
    authOnly: true,
    element: <History />,
  },
  [AppRoutes.FAVORITES]: {
    path: RoutePath.favorites,
    authOnly: true,
    element: <Favorites />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    authOnly: false,
    element: <Login />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    authOnly: true,
    element: <Profile />,
  },
  [AppRoutes.SIGNUP]: {
    path: RoutePath.signup,
    authOnly: false,
    element: <Signup />,
  },
  [AppRoutes.PROMPT]: {
    path: RoutePath["prompt/:slug"],
    authOnly: true,
    element: <Prompt />,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <>
        <h1>404</h1>
      </>
    ),
  },
}
